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
