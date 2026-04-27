import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request, Response } from 'express';

/**
 * Global distributed rate-limiting guard backed by Redis (sliding window).
 *
 * - Extracts the real client IP from X-Forwarded-For when behind a proxy,
 *   falling back to the direct socket address.
 * - Writes standard rate-limit headers (RateLimit-Limit, RateLimit-Remaining,
 *   RateLimit-Reset, Retry-After) on every response.
 */
@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
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

  protected override async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: {
      limit: number;
      ttl: number;
      key: string;
      tracker: string;
      totalHits: number;
      timeToExpire: number;
      isBlocked: boolean;
      timeToBlockExpire: number;
    },
  ): Promise<void> {
    const response = context.switchToHttp().getResponse<Response>();
    const retryAfter = Math.ceil(throttlerLimitDetail.timeToExpire / 1000);
    const resetAt = Math.floor(Date.now() / 1000) + retryAfter;

    response.setHeader('Retry-After', retryAfter);
    response.setHeader('RateLimit-Limit', throttlerLimitDetail.limit);
    response.setHeader('RateLimit-Remaining', 0);
    response.setHeader('RateLimit-Reset', resetAt);

    await super.throwThrottlingException(context, throttlerLimitDetail);
  }
}
