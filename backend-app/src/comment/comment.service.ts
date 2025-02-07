import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from 'src/post/post.repository';
import { UserRepository } from 'src/user/user.repository';
import { CommentRepository } from './comment.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostCommentAdded } from './comment.event';
@Injectable()
export class CommentService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
    private eventEmitter: EventEmitter2
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
    console.log('Emitting event:', {
      postId,
      userId,
      content: createCommentDto.content,
    });


    this.eventEmitter.emit(
      PostCommentAdded.EVENT_NAME, 
      new PostCommentAdded(postId, userId, createCommentDto.content) 
    );

    console.log('Emitting event:', {
      postId,
      userId,
      content: createCommentDto.content,
    });
    
    return this.commentRepository.save(comment);
  }
}
