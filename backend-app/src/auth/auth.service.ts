import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  // Handle OAuth user creation or update
  async validateOAuthUser(profile: any, provider: 'google' | 'github'): Promise<User> {
    const email = profile._json.email;
    const name = profile._json.name || profile.displayName;
    const oauthId = profile._json.id;
    const photoUrl = profile._json.picture || profile._json.avatar_url;
    const bio = profile._json.bio || null;

    const createUserDto: CreateUserDto = {
      photoUrl,
      email,
      username: name,
      bio,
      googleId: provider === 'google' ? oauthId : undefined,
      githubId: provider === 'github' ? oauthId : undefined,
    };

    return this.userService.createOrUpdateUser(createUserDto);
  }

  // Handle user signup
  async signup(signupDto: SignupDto ): Promise<User> {
    const hashedPassword = await this.hashPassword(signupDto.password);
    signupDto.password = hashedPassword;

    // Pass the signupDto directly to the userService
    return this.userService.createOrUpdateUser(signupDto);
  }

  // Handle user login
  async login(LoginDto:LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user || !(await this.validatePassword(LoginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.generateJwt(payload);

    return { accessToken };
  }
}
