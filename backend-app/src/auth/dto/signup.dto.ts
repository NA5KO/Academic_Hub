import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
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
