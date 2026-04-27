import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Redis } from 'ioredis';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PetModule } from './pet/pet.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RedisModule } from './redis/redis.module.js';
import { REDIS_CLIENT } from './redis/redis.constants.js';
import { RateLimitGuard } from './common/guards/rate-limit.guard.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    RedisModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService, REDIS_CLIENT],
      useFactory: (_configService: ConfigService, redisClient: Redis) => ({
        throttlers: [
          {
            // Default: 60 requests per minute (covers all public/pet endpoints)
            name: 'default',
            ttl: 60_000,
            limit: 60,
          },
        ],
        storage: new ThrottlerStorageRedisService(redisClient),
      }),
    }),
    PetModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Register RateLimitGuard globally so every endpoint is protected by default.
    // Auth endpoints override limits via @Throttle() decorators.
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {}

