import {
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';

/**
 * Global distributed rate-limiting guard backed by Redis (sliding window counter).
 *
 * - Extracts the real client IP from X-Forwarded-For when behind a proxy,
 *   falling back to the direct socket address.
 */
@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  // Skip rate limiting entirely in dev to avoid Redis dependency during local development
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.configService.get<string>('DEV_ENVIRONMENT') === 'true') return true;
    return super.canActivate(context);
  }

  protected override getTracker(req: Request): Promise<string> {
    // Trust the leftmost IP from X-Forwarded-For (set by load balancers/proxies).
    // For development without a proxy this falls back to the direct socket IP.
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0])?.trim() ??
      req.socket.remoteAddress ??
      'unknown';

    return Promise.resolve(ip);
  }
}
