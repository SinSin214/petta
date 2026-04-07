import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../auth.repository.js';
import * as messageConst from '../../utils/constants/message.constant.js';

type AuthRequest = Request & {
	headers: { authorization?: string };
	user?: { userId: string; email: string; role: string };
};

@Injectable()
export class ActiveUserGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private authRepository: AuthRepository,
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthRequest>();
		const token = this.extractBearerToken(request.headers.authorization);

		if (!token) {
			throw new UnauthorizedException({ code: messageConst.INVALID_ACCESS_TOKEN });
		}

		const payload = await this.verifyToken(token);
		const user = await this.authRepository.findActiveUserById(payload.userId);

		if (!user) {
			throw new UnauthorizedException({ code: messageConst.INVALID_ACCESS_TOKEN });
		}

		request.user = { userId: user.id, email: user.email, role: user.role };
		return true;
	}

	private extractBearerToken(authorization?: string): string | null {
		if (!authorization) {
			return null;
		}

		const [scheme, token] = authorization.split(' ');
		if (scheme !== 'Bearer' || !token) {
			return null;
		}

		return token;
	}

	private async verifyToken(token: string): Promise<{ userId: string }> {
		try {
			const secret = this.configService.get<string>('JWT_SECRET');
			return await this.jwtService.verifyAsync<{ userId: string }>(token, { secret });
		} catch {
			throw new UnauthorizedException({ code: messageConst.INVALID_ACCESS_TOKEN });
		}
	}
}
