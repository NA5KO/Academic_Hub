import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from 'src/post/post.repository';
import { UserRepository } from 'src/user/user.repository';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async createComment(
    postId: string,
    userId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error('Post not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Add author's username
    const comment = this.commentRepository.create({
      ...createCommentDto,
      post, // Associate the post
      author: user, // Associate the user as the author of the comment
      authorUsername: user.username || 'Academic Hub User',
    });

    console.log(comment);
    return this.commentRepository.save(comment);
  }
}
