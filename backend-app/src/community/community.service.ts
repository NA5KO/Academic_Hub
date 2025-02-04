import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/repositories/GenericRepository';
import { Community } from './community.model';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto'; // Assuming this DTO exists
import { UserRepository } from 'src/user/user.repository'; // Import the UserRepository

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: GenericRepository<Community>,
    private readonly userRepository: UserRepository, // Inject UserRepository
  ) {}

  // Create community
  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const { creatorId, ...communityData } = createCommunityDto;

    // Fetch the creator user
    const creator = await this.userRepository.findOne({
      where: { id: creatorId },
    });
    if (!creator) {
      throw new Error('Creator not found');
    }

    // Create the new community and include creator from the DTO
    const community = this.communityRepository.create({
      ...communityData,
      creator, // Assign the fetched creator
    });

    return this.communityRepository.save(community);
  }

  // Get all communities
  async findAll(): Promise<Community[]> {
    return this.communityRepository.find({ relations: ['creator', 'followers'] });
  }

  // Get a single community by ID
  async findOne(id: number): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { id: id.toString() },
    });
    if (!community) {
      throw new Error('Community not found');
    }
    return community;
  }

  // Get a single community by name
  async findOneByName(name: string): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { name },
    });
    if (!community) {
      throw new Error('Community not found');
    }
    return community;
  }

  // Update community
  async update(
    id: number,
    updateCommunityDto: UpdateCommunityDto,
  ): Promise<Community> {
    const community = await this.findOne(id);

    // Update the community fields
    Object.assign(community, updateCommunityDto);

    return this.communityRepository.save(community);
  }

  // Delete community
  async remove(id: number): Promise<void> {
    const community = await this.findOne(id);
    await this.communityRepository.remove(community);
  }

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

  // not tested yet
  async followCommunity(
    userId: string,
    communityId: string,
  ): Promise<Community> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
    });

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
}
