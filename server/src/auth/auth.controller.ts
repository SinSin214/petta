import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Redirect, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service.js';
import { ActiveUserGuard } from './guards/active-user.guard.js';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto/auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // 5 registration attempts per hour per IP — prevents account farming
  @Throttle({ default: { ttl: 3_600_000, limit: 5 } })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // Email verification is a one-click link — skip rate limiting
  @SkipThrottle()
  @Get('verify_email')
  @Redirect()
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    await this.authService.verifyEmail(dto.token);

    const clientBaseUrl =
      this.configService.get<string>('CLIENT_URL') ??
      'http://localhost:3000';

    const redirectUrl = new URL('/', clientBaseUrl);
    redirectUrl.searchParams.set('verified', 'success');

    return {
      url: redirectUrl.toString(),
    };
  }

  // 10 login attempts per 15 minutes per IP — brute force protection
  @Throttle({ default: { ttl: 900_000, limit: 10 } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // 30 refresh calls per 15 minutes per IP — prevents token refresh flooding
  @Throttle({ default: { ttl: 900_000, limit: 30 } })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  // Logout is a low-risk action, inherits the global default limit
  @Post('logout')
  @UseGuards(ActiveUserGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  // 3 forgot-password requests per hour per IP — prevents email bombing
  @Throttle({ default: { ttl: 3_600_000, limit: 3 } })
  @Post('forgot_password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  // 5 reset attempts per hour per IP — prevents token brute force
  @Throttle({ default: { ttl: 3_600_000, limit: 5 } })
  @Post('reset_password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.password);
  }
}
