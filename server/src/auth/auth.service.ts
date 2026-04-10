import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	InternalServerErrorException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenType } from '../../prisma/generated/prisma/enums.js';
import { AuthRepository } from './auth.repository.js';
import { RegisterDto, LoginDto } from './dto/auth.dto.js';
import { createHash, randomBytes } from 'crypto';
import * as messageConst from '../utils/constants/message.constant.js';
import { MailService } from '../mail/mail.service.js';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private authRepository: AuthRepository,
		private jwtService: JwtService,
		private configService: ConfigService,
		private mailService: MailService,
	) { }

	async register(dto: RegisterDto) {
		const existingUser = await this.authRepository.findUserByEmail(dto.email);
		if (existingUser) {
			throw new ConflictException({ code: messageConst.USED_EMAIL });
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);

		const user = await this.authRepository.createUser({
			email: dto.email,
			password: hashedPassword,
			name: dto.name,
		});

		try {
			const verificationLink = await this.createEmailVerificationLink(user.id);
			await this.mailService.sendVerifyEmail({
				to: user.email,
				name: user.name,
				verificationLink,
			});
		} catch (error) {
			await this.authRepository.deleteUser(user.id);
			this.logger.error(error);
			throw new InternalServerErrorException({ code: messageConst.EMAIL_DELIVERY_FAILED });
		}

		return { code: messageConst.VERIFY_EMAIL_SENT };
	}

	async verifyEmail(token: string) {
		const tokenHash = createHash('sha256').update(token).digest('hex');
		const verificationToken = await this.authRepository.findValidEmailVerificationToken(tokenHash);

		if (!verificationToken) {
			throw new BadRequestException({ code: messageConst.INVALID_OR_EXPIRED_VERIFY_EMAIL_TOKEN });
		}

		await this.authRepository.activateUser(verificationToken.userId);
		await this.authRepository.markTokenAsUsed(verificationToken.id);
		// Revoke other still-valid verification tokens for the user to prevent reuse.
		await this.authRepository.revokeEmailVerificationTokens(verificationToken.userId);

		return { code: messageConst.EMAIL_VERIFIED_SUCCESS };
	}

	async login(dto: LoginDto) {
		const user = await this.authRepository.findUserByEmail(dto.email);
		if (!user) {
			throw new UnauthorizedException({ code: messageConst.INVALID_CREDENTIALS });
		}

		if (!user.isActive) {
			throw new ForbiddenException({ code: messageConst.EMAIL_NOT_VERIFIED });
		}

		const passwordValid = await bcrypt.compare(dto.password, user.password);
		if (!passwordValid) {
			throw new UnauthorizedException({ code: messageConst.INVALID_CREDENTIALS });
		}

		const tokens = await this.generateTokens(user.id, user.email, user.role);
		return { user, tokens };
	}

	async refreshTokens(refreshToken: string) {
		const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
		const storedRefreshToken = await this.authRepository.findRefreshToken(tokenHash);

		if (!storedRefreshToken || storedRefreshToken.isRevoked || storedRefreshToken.expiresAt < new Date()) {
			throw new UnauthorizedException({ code: messageConst.INVALID_REFRESH_TOKEN });
		}

		await this.authRepository.revokeToken(storedRefreshToken.id);

		const user = await this.authRepository.findActiveUserById(storedRefreshToken.userId);
		if (!user) {
			throw new UnauthorizedException({ code: messageConst.USER_NOT_FOUND });
		}

		const tokens = await this.generateTokens(user.id, user.email, user.role);
		return tokens;
	}

	async logout(refreshToken: string) {
		const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
		const storedRefreshToken = await this.authRepository.findRefreshToken(tokenHash);
		if (storedRefreshToken) {
			await this.authRepository.revokeToken(storedRefreshToken.id);
		}

		return { code: messageConst.LOGGED_OUT_SUCCESS };
	}

	async forgotPassword(email: string) {
		const user = await this.authRepository.findUserByEmail(email);

		if (!user) {
			return { code: messageConst.RESET_LINK_SENT };
		}

		await this.authRepository.invalidatePasswordResetTokens(user.id);

		const rawToken = randomBytes(40).toString('hex');
		const tokenHash = createHash('sha256').update(rawToken).digest('hex');
		const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

		await this.authRepository.createToken({
			userId: user.id,
			tokenHash,
			type: TokenType.PASSWORD_RESET,
			expiresAt,
		});

		return {
			code: messageConst.RESET_LINK_SENT,
			resetToken: rawToken,
		};
	}

	async resetPassword(token: string, password: string) {
		const tokenHash = createHash('sha256').update(token).digest('hex');
		const resetToken = await this.authRepository.findValidPasswordResetToken(tokenHash);

		if (!resetToken) {
			throw new BadRequestException({ code: messageConst.INVALID_OR_EXPIRED_RESET_TOKEN });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await this.authRepository.updateUserPassword(resetToken.userId, hashedPassword);
		await this.authRepository.markTokenAsUsed(resetToken.id);
		await this.authRepository.revokeAllUserRefreshTokens(resetToken.userId);

		return { code: messageConst.PASSWORD_RESET_SUCCESS };
	}

	private async generateTokens(userId: string, email: string, role: string) {
		const payload = { userId, email, role };

		const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

		const refreshToken = randomBytes(40).toString('hex');
		const refreshTokenHash = createHash('sha256').update(refreshToken).digest('hex');
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		await this.authRepository.createToken({
			userId,
			tokenHash: refreshTokenHash,
			type: TokenType.REFRESH,
			expiresAt,
		});

		return { accessToken, refreshToken };
	}

	private async createEmailVerificationLink(userId: string) {
		// Revoke other still-valid verification tokens for the user to prevent reuse.
		await this.authRepository.revokeEmailVerificationTokens(userId);

		const rawToken = randomBytes(40).toString('hex');
		const tokenHash = createHash('sha256').update(rawToken).digest('hex');
		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

		await this.authRepository.createToken({
			userId,
			tokenHash,
			type: TokenType.EMAIL_VERIFICATION,
			expiresAt,
		});

		const configuredBaseUrl = this.configService.get<string>('VERIFY_EMAIL_URL');
		const apiBaseUrl = this.configService.get<string>('NEXT_PUBLIC_API_ROUTE')
			?? `http://localhost:${this.configService.get<number>('PORT_SERVER') ?? 3000}`;
		const verificationUrl = new URL(configuredBaseUrl ?? `${apiBaseUrl}/auth/verify_email`);
		verificationUrl.searchParams.set('token', rawToken);

		return verificationUrl.toString();
	}
}
