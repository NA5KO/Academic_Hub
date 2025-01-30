import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google-strategy';
import { GithubStrategy } from './strategies/gtihub-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET|| 'default-secret-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, GithubStrategy],
  exports: [AuthService, JwtModule],
  
})
export class AuthModule {}
