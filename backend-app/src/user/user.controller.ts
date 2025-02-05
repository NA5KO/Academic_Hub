import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Post as PostModel } from 'src/post/post.model';
import { CreateUserDto } from './dto/createuser.dto';
import { Comment as CommentModel } from 'src/comment/comment.model';
import { AuthGuard } from 'src/auth/guards/auth-guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard) // Protects the route using JWT Auth
  @Get('me')
  async getMyProfile(@Req() req): Promise<User> {
    return req.user;
  }

  // Endpoint to get a user by emai
  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    console.log('id', id);
    const user = await this.userService.findById(id);
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
  @Get(':userId/comments')
  async getUserCommentss(
    @Param('userId') userId: string,
  ): Promise<CommentModel[]> {
    return this.userService.getLatestCommentsByUserId(userId);
  }
  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
