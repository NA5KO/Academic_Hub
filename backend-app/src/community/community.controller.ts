import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './community.model';
import { PostService } from '../post/post.service';

@Controller()
export class CommunityController {
  constructor(
    private readonly communityService: CommunityService,
    // private readonly postService: PostService
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('create-community')
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  // not tested yet
  @Post('community/:communityId/follow/:userId')
  async followCommunity(
    @Param('communityId') communityId: string,
    @Param('userId') userId: string,
  ): Promise<Community> {
    return this.communityService.followCommunity(userId, communityId);
  }

  @Get('community/top')
  async getTopCommunities(): Promise<Community[]> {
    return this.communityService.getTopCommunities();
  }

  @Get('community')
  async getAll(): Promise<Community[]> {
    return this.communityService.findAll();
  }

  @Get('community/:name')
  findOneByName(@Param('name') name: string) {
    return this.communityService.findOneByName(name);
  }

  @Get('community/:id')
  findOne(@Param('id') id: number) {
    return this.communityService.findOne(+id);
  }

  // @Get(':name/posts')
  // getPostsForCommunity(@Param('name') name: string) {
  //   return this.postService.getPostsByCommunity(name); 
  // }

  @Patch('community/:id')
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communityService.update(+id, updateCommunityDto);
  }

  @Delete('community/:id')
  remove(@Param('id') id: string) {
    return this.communityService.remove(+id);
  }
}
