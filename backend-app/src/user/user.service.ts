// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './user.model';
import { GenericRepository } from 'src/common/repositories/GenericRepository';
import { Community } from 'src/community/community.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: GenericRepository<User>,
    @InjectRepository(Community) private readonly communityRepository: GenericRepository<Community>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createOrUpdateUser(createUserDto: CreateUserDto ): Promise<User> {
    let user = await this.findByEmail(createUserDto.email);

    if (user) {
      // Update user if already exists
      user.username = createUserDto.username ?? user.username;
      user.isActive = createUserDto.isActive ?? user.isActive;
      user.phone = createUserDto.phone ?? user.phone;
      user.location = createUserDto.location ?? user.location;
      user.linkedin = createUserDto.linkedin ?? user.linkedin;
      user.github = createUserDto.github ?? user.github;
      user.bio = createUserDto.bio ?? user.bio;
      user.degree = createUserDto.degree ?? user.degree;
      user.specialization = createUserDto.specialization ?? user.specialization;
      user.skills = createUserDto.skills ?? user.skills;
      user.profession = createUserDto.profession ?? user.profession;
      user.program = createUserDto.program ?? user.program;
      user.photoUrl = createUserDto.photoUrl ?? user.photoUrl;
    } else {
      // Create new user if not exists
      user = this.userRepository.create(createUserDto);
    }

    return this.userRepository.save(user);
  }

  async followCommunity(userId: string, communityId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['communities'] });
    const community = await this.communityRepository.findOne({ where: { id: communityId } });

    if (!user || !community) {
      throw new NotFoundException('User or Community not found');
    }

    // Add community to user's followed list if not already followed
    if (!user.communities.some(c => c.id === communityId)) {
      user.communities.push(community);
      await this.userRepository.save(user);
    }

    return user;
  }

  async unfollowCommunity(userId: string, communityId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['communities'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.communities = user.communities.filter(c => c.id !== communityId);
    await this.userRepository.save(user);

    return user;
  }

  async getFollowedCommunities(userId: string): Promise<Community[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['communities'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.communities;
  }

  async isFollowing(userId: string, communityId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['communities'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.communities.some(c => c.id === communityId);
  }
}