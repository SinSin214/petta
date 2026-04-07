import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ActiveUserGuard } from './guards/active-user.guard.js';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthRepository } from './auth.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { MailService } from '../mail/mail.service.js';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ActiveUserGuard, MailService],
  exports: [AuthService],
})
export class AuthModule {}
