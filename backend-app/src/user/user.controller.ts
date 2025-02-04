import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Delete } from '@nestjs/common';
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

  @Get(':userId/is-following/:communityId')
  async isFollowing(@Param('userId') userId: string, @Param('communityId') communityId: string) {
    return this.userService.isFollowing(userId, communityId);
  }
}
