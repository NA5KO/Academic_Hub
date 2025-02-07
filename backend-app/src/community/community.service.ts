import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/repositories/GenericRepository';
import { Community } from './community.model';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UserRepository } from 'src/user/user.repository'; 

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: GenericRepository<Community>,
    private readonly userRepository: UserRepository,
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

  // get all communities
  async findAll(): Promise<Community[]> {
    return this.communityRepository.find({ relations: ['creator', 'followers'] });
  }

  // Get a single community by name
  async findOneByName(name: string): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { name },
      relations: ['posts', 'followers', 'creator', 'posts.author', 'posts.community', 'posts.comments']
    });
    if (!community) {
      throw new Error('Community not found');
    }
    return community;
  }

  async getTopCommunities(): Promise<Community[]> {
    try {
      const topCommunities = await this.communityRepository
        .createQueryBuilder('community')
        .orderBy('community.followersCount', 'DESC')
        .limit(12)
        .getMany(); // executes lquery and returns an array of topComm

      return topCommunities;
    } catch (error) {
      throw new Error('Error fetching top communities: ' + error.message);
    }
  }

  async findByName(name: string): Promise<Community | null> {
    return this.communityRepository.findOne({ where: { name } });
  }

  async getRelatedCommunities(communityId: string): Promise<Community[]> {
    // Récupérer la communauté cible
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
    });

    if (!community) {
      throw new Error('Community not found');
    }
    // Récupérer les autres communautés ayant au moins un mot-clé en commun
    return this.communityRepository
      .createQueryBuilder('community')
      .where('community.id != :id', { id: communityId })
      .andWhere(
        `community.keywords && :keywords`, // Vérifie l'intersection avec les mots-clés
        { keywords: community.keywords },
      )
      .getMany();
  }
}
