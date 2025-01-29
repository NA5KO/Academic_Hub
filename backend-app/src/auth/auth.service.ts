import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly http: HttpService,
  ) {}

  // Hash a password
  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    return await bcrypt.hash(password, saltRounds);
  }

  // Validate a password
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
      throw new Error('Password or hashed password is missing');
    }
  
    return bcrypt.compare(password, hashedPassword);
  }

  // Generate a JWT token
  generateJwt(payload: { sub: string; email: string }): string {
    return this.jwtService.sign(payload);
  }


  async validateOAuthUser(profile: any, provider: 'google' | 'github'): Promise<User> {
    console.log('OAuth profile:', profile);
    const email = profile.email;
    const name = profile.name || profile.displayName;
    const oauthId = profile.sub; 
    const photoUrl = profile.picture || null;

    let user = await this.userService.findByEmail(email);
    if (!user) {
        user = await this.userService.createOrUpdateUser({
            email,
            username: name,
            photoUrl,
            googleId: provider === 'google' ? oauthId : undefined,
            githubId: provider === 'github' ? oauthId : undefined,
        });
    }

    return user;
}




  async getGoogleUserProfile(oauthToken: string) {
    try {
        const { data } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${oauthToken}`);
        return data;
    } catch (error) {
        console.error('Error fetching Google user profile:', error.response?.data || error.message);
        return null;
    }
}




  // Exchange Google Auth code for a token
  // async exchangeGoogleAuthCodeForToken(code: string): Promise<string> {
  //   console.log('Exchanging Google auth code for token:', code);
  //   const googleApiUrl = 'https://oauth2.googleapis.com/token';
  //   const params = new URLSearchParams();
  //   params.append('code', code);
  //   params.append('client_id', '491160602747-ovdftgsvteebotmki95c6r068mfk4op9.apps.googleusercontent.com'); // Use env variable
  //   params.append('client_secret', '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'); // Use env variable
  //   params.append('redirect_uri', 'http://localhost:3000/auth/google/callback'); // Use env variable
  //   params.append('grant_type', 'authorization_code');
    
  //   try {
  //     const response = await firstValueFrom(this.http.post(googleApiUrl, params));
  //     console.log('Google API response:', response.data);
  //     return response.data.access_token;
  //   } catch (error) {
  //     console.error('Error from Google API:', error.response?.data || error.message);
  //     throw error;  // Log the error details
  //   }
  // }

  // Handle user signup
  async signup(signupDto: SignupDto ): Promise<User> {
    const hashedPassword = await this.hashPassword(signupDto.password);
    signupDto.password = hashedPassword;

    return this.userService.createOrUpdateUser(signupDto);
  }

  // Handle user login
  async login(LoginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user || !(await this.validatePassword(LoginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.generateJwt(payload);

    return { accessToken };
  }
}
