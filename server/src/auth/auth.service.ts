import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '../../prisma/generated/prisma/enums.js';
import { AuthRepository } from './auth.repository.js';
import { AuthCode } from './auth.codes.js';
import { RegisterDto, LoginDto } from './dto/auth.dto.js';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class AuthService {
	constructor(
		private authRepository: AuthRepository,
		private jwtService: JwtService,
	) { }

	async register(dto: RegisterDto) {
		const user = await this.authRepository.findUserByEmail(dto.email);
		if (user) {
			throw new ConflictException({ code: AuthCode.UsedEmail });
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);

		const newUser = await this.authRepository.createUser({
			email: dto.email,
			password: hashedPassword,
			name: dto.name,
		});

		const tokens = await this.generateTokens(newUser.id, newUser.email, newUser.role);
		return { user: newUser, tokens };
	}

	async login(dto: LoginDto) {
		const user = await this.authRepository.findUserByEmail(dto.email);
		if (!user) {
			throw new UnauthorizedException({ code: AuthCode.InvalidCredentials });
		}

		const passwordValid = await bcrypt.compare(dto.password, user.password);
		if (!passwordValid) {
			throw new UnauthorizedException({ code: AuthCode.InvalidCredentials });
		}

		const tokens = await this.generateTokens(user.id, user.email, user.role);
		return { user, tokens };
	}

	async refreshTokens(refreshToken: string) {
		const session = await this.authRepository.findSessionByToken(refreshToken);

		if (!session || session.isRevoked || session.expiresAt < new Date()) {
			throw new UnauthorizedException({ code: AuthCode.InvalidRefreshToken });
		}

		await this.authRepository.revokeSession(session.id);

		const user = await this.authRepository.findUserById(session.userId);
		if (!user) {
			throw new UnauthorizedException({ code: AuthCode.UserNotFound });
		}

		const tokens = await this.generateTokens(user.id, user.email, user.role);
		return tokens;
	}

	async logout(refreshToken: string) {
		const session = await this.authRepository.findSessionByToken(refreshToken);
		if (session) {
			await this.authRepository.revokeSession(session.id);
		}

		return { code: AuthCode.LoggedOutSuccess };
	}

	async forgotPassword(email: string) {
		const user = await this.authRepository.findUserByEmail(email);

		if (!user) {
			return { code: AuthCode.ResetLinkSent };
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
			code: AuthCode.ResetLinkSent,
			resetToken: rawToken,
		};
	}

	async resetPassword(token: string, newPassword: string) {
		const tokenHash = createHash('sha256').update(token).digest('hex');
		const resetToken = await this.authRepository.findValidPasswordResetToken(tokenHash);

		if (!resetToken) {
			throw new BadRequestException({ code: AuthCode.InvalidOrExpiredResetToken });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await this.authRepository.updateUserPassword(resetToken.userId, hashedPassword);
		await this.authRepository.markTokenAsUsed(resetToken.id);
		await this.authRepository.revokeAllUserSessions(resetToken.userId);

		return { code: AuthCode.PasswordResetSuccess };
	}

	private async generateTokens(userId: string, email: string, role: string) {
		const payload = { userId, email, role };

		const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

		const refreshToken = randomBytes(40).toString('hex');
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		await this.authRepository.createSession({
			userId,
			refreshToken,
			expiresAt,
		});

		return { accessToken, refreshToken };
	}
}
