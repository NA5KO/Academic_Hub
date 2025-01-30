import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './community.model';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.model';

@Injectable()
export class CommunityService {

  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTopCommunities(): Promise<Community[]> {
    try {
      const topCommunities = await this.communityRepository
        .createQueryBuilder('community')
        .orderBy('community.followersCount', 'DESC')
        .limit(12)
        .getMany();

      return topCommunities;
    } catch (error) {
      throw new Error('Error fetching top communities: ' + error.message);
    }
  }
  

  async followCommunity(userId: string, communityId: string): Promise<Community> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const community = await this.communityRepository.findOne({ where: { id: communityId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    // Check if the user is already following the community
    if (user.communities.some((comm) => comm.id === communityId)) {
      throw new Error('User is already following this community');
    }

    user.communities.push(community);
    await this.userRepository.save(user);
    return community;
  }

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const community = this.communityRepository.create(createCommunityDto);
    return await this.communityRepository.save(community);
  }

  findAll() {
    return this.communityRepository.find();
  }

  async findOne(communityName: string): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { name: communityName },
      relations: ['followers', 'posts'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
