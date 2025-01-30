// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './user.model';
import { GenericRepository } from 'src/common/repositories/GenericRepository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: GenericRepository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
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
}
