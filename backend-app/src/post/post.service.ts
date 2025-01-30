import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id: id.toString() }, relations: ['comments', 'community', 'author'] });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
