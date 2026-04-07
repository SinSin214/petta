import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import * as messageConst from '../../utils/constants/message.constant.js';

export class RegisterDto {
  @IsEmail({}, {
    message: messageConst.INVALID_EMAIL_FORMAT
  })
  email: string;

  @MinLength(8, {
    message: messageConst.PASSWORD_MIN_LENGTH_8
  })
  password: string;

  @IsNotEmpty({
    message: messageConst.FIELD_NAME_REQUIRED,
  })
  name: string;
}

export class LoginDto {
  @IsEmail({}, {
    message: messageConst.INVALID_EMAIL_FORMAT
  })
  email: string;

  @IsNotEmpty({
    message: messageConst.FIELD_PASSWORD_REQUIRED,
  })
  password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty({
    message: messageConst.GENERIC_ERROR,
  })
  refreshToken: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, {
    message: messageConst.INVALID_EMAIL_FORMAT
  })
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty({
    message: messageConst.GENERIC_ERROR,
  })
  token: string;

  @MinLength(8, {
    message: messageConst.PASSWORD_MIN_LENGTH_8,
  })
  password: string;
}

export class VerifyEmailDto {
  @IsNotEmpty({
    message: messageConst.GENERIC_ERROR,
  })
  token: string;
}
