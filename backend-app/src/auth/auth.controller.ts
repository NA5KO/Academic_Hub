import { Controller, Post, Body, Get, Req, UseGuards, Res, UploadedFile, UseInterceptors, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup endpoint
 
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    console.log('Signup DTO:', signupDto);
  
    // Call signup service to create/update the user
    const user = await this.authService.signup(signupDto);
  
    return {
      message: 'User signed up successfully',
      user,
    };
  }
  
  
  // Login endpoint
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return {
      message: 'Login successful',
      ...token,
    };
  }

  // Google OAuth login trigger
  @Post('google')
  async googleAuth(@Body() oauthData: { oauthToken: string }) {
      console.log('Google OAuth token received:', oauthData.oauthToken);
  
      const googleProfile = await this.authService.getGoogleUserProfile(oauthData.oauthToken);
      if (!googleProfile) {
          throw new UnauthorizedException('Invalid Google OAuth token');
      }
      // console.log('Google profile:', googleProfile);
  
      const user = await this.authService.validateOAuthUser(googleProfile, 'google');
      const accessToken = this.authService.generateJwt({ sub: user.id, email: user.email });
  
      return {
        message: 'Google login successful',
        accessToken,
      };
  }
  
  

  // Google OAuth callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res) {
    const user = req.user;
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.authService.generateJwt(payload);
    res.redirect(`http://localhost:4200?accessToken=${accessToken}`);
    return {
      message: 'Google login successful',
      user,
      accessToken,
    };
  }


}
