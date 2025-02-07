import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { Community } from './community.model';

@Controller()
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('create-community')
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  // returns top communities
  @Get('communities')
  async getTopCommunities(): Promise<Community[]> {
    return this.communityService.getTopCommunities();
  }

  // returns all communities
  @Get('community')
  async getAll(): Promise<Community[]> {
    return this.communityService.findAll();
  }

  @Get('community/:name')
  findOneByName(@Param('name') name: string) {
    return this.communityService.findOneByName(name);
  }

  // fetches related communities to the one the user is browsing
  // yekhou the community's name ml params first then fetches by its uuid
  @Get('community/:id/related')
  async getRelated(@Param('id') communityId: string): Promise<Community[]> {
    return this.communityService.getRelatedCommunities(communityId);
  }
  @Get('get-community-id/:name')
  async getCommunityByName(@Param('name') name: string) {
    const community = await this.communityService.findByName(name);
    if (!community) {
      throw new NotFoundException(`Community '${name}' not found`);
    }
    return { id: community.id };
  }
}
