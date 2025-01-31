import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service'; // Adjust the import path as needed
import { User } from './user.model'; // Adjust the import path as needed

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // Endpoint to get a user by email
  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // Endpoint to get all users (optional)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
