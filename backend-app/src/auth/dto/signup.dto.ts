import { IsString, IsEmail, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { PasswordStrengthValidator } from '../validators/password-strength.validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Validate(PasswordStrengthValidator)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  linkedin: string;

  @IsString()
  @IsOptional()
  github: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  degree: string;

  @IsString()
  @IsOptional()
  specialization: string;

  @IsString()
  @IsOptional()
  skills: string;

  @IsString()
  @IsOptional()
  program: string;

  @IsString()
  @IsOptional()
  profession: string;

  @IsString()
  @IsOptional()
  photo: string;  
}
