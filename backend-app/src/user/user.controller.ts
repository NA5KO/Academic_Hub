import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus, Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Post as PostModel } from 'src/post/post.model';
import { CreateUserDto } from './dto/createuser.dto';
import { Comment as CommentModel } from 'src/comment/comment.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
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
  // Endpoint to get all users (optional)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  
  // Endpoint to follow a community
  @Post(':userId/follow/:communityId')
  async followCommunity(@Param('userId') userId: string, @Param('communityId') communityId: string) {
    return this.userService.followCommunity(userId, communityId);
  }

  // Endpoint to unfollow a community
  @Delete(':userId/unfollow/:communityId')
  async unfollowCommunity(@Param('userId') userId: string, @Param('communityId') communityId: string) {
    return this.userService.unfollowCommunity(userId, communityId);
  }

  @Get(':userId/followed-communities')
  async getFollowedCommunities(@Param('userId') userId: string) {
    return this.userService.getFollowedCommunities(userId);
  }

  @Get(':id/created-communities')
  async getCreatedCommunities(@Param('id') userId: string) {
    return this.userService.getCreatedCommunities(userId);
  }

  @Get(':userId/is-following/:communityId')
  async isFollowing(@Param('userId') userId: string, @Param('communityId') communityId: string) {
    return this.userService.isFollowing(userId, communityId);
  }
}
