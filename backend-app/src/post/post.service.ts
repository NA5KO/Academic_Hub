import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { Post } from './post.model';
import { UserRepository } from '../user/user.repository';
import { CommunityRepository } from '../community/community.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly communityRepository: CommunityRepository,
  ) {}

  // Create a new post
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, content, tags, type, communityId, authorId } = createPostDto;

    // Fetch community and author
    const community = await this.communityRepository.findOne({ where: { id: communityId } });
    const author = await this.userRepository.findOne({ where: { id: authorId } });

    // Ensure community and author exist
    if (!community || !author) {
      throw new Error('Community or Author not found!');
    }

    // Create new post and associate it with community and author
    const newPost = this.postRepository.create({
      title,
      content,
      tags,
      type,
      community,
      author,
    });

    // Save the post
    return this.postRepository.save(newPost);
  }

  // Get all posts with their relations (comments, community, author)
  async findAll() {
    return this.postRepository.findWithRelations(); // Use the new method to fetch posts with relations
  }

  // Find one post by ID with relationships loaded
  async findOne(id: string): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'community', 'author'],
    });
  }

  // Update an existing post
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);  // Return the updated post
  }

  // Delete a post by ID
  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
