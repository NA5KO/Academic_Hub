import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service'; // Adjust the import path as needed
import { User } from './user.model'; // Adjust the import path as needed
import { Post as PostModel } from 'src/post/post.model';
import { CreateUserDto } from './dto/createuser.dto';

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
  @Patch(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    const user = await this.userService.findByEmail(email);
    const updatedUser = { ...user, ...updateUserDto };
    return this.userService.createOrUpdateUser(updatedUser);
  }
  @Post(':email/follow')
  async followUser(
    @Param('email') followingEmail: string,
    @Body('followerEmail') followerEmail: string,
  ) {
    return this.userService.followUser(followerEmail, followingEmail);
  }

  @Post(':email/unfollow')
  async unfollowUser(
    @Param('email') followingEmail: string,
    @Body('followerEmail') followerEmail: string,
  ) {
    return this.userService.unfollowUser(followerEmail, followingEmail);
  }

  @Get(':userId/posts')
  async getUserPosts(@Param('userId') userId: string): Promise<PostModel[]> {
    return this.userService.getUserPostsByUserId(userId);
  }
  // Endpoint to get all users (optional)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
