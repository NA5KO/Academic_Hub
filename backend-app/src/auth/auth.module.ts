import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { JwtAuthGuard } from './guards/auth-guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, JwtAuthGuard],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}

// @Module({
//   imports: [
//     HttpModule,
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'default-secret-key',
//       signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '3600s' },
//     }),
//     UserModule,
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, GoogleStrategy, GithubStrategy],
//   exports: [AuthService, JwtModule],
// })
