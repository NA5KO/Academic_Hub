import { Controller, Post, Body, Get, Req, UseGuards, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
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
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return { message: 'Redirecting to Google OAuth' };
  }

  // Google OAuth callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res) {
    const user = req.user;
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.authService.generateJwt(payload);
    res.redirect('http://localhost:4200');
    return {
      message: 'Google login successful',
      user,
      accessToken,
    };
  }

  // GitHub OAuth login trigger
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    return { message: 'Redirecting to GitHub OAuth' };
  }

  // GitHub OAuth callback
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: any, @Res() res) {
    const user = req.user;
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.authService.generateJwt(payload);
    res.redirect('http://localhost:4200');
    return {
      message: 'GitHub login successful',
      user,
      accessToken,
    };
  }
}
