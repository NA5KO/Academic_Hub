import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.model';
import { Community } from 'src/community/community.model';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  // Get all posts
  async findAll() {
    return await this.postRepository.find({
      relations: ['author', 'community'],
      order: { createdAt: 'DESC' },
    });
  }

  getPostsByCommunity(communityName: string) {
    return this.postRepository.find({
      where: { community: { name: communityName } }, 
      relations: ['community'],
    });
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'community'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID '${id}' not found`);
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    return await this.postRepository.remove(post);
  }
}
