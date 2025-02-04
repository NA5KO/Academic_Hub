import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
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

    const comment = this.commentRepository.create({
      ...createCommentDto,
      post, // Associate the post
      author: user, // Associate the user as the author of the comment
    });

    console.log(comment);
    return this.commentRepository.save(comment);
  }

  // Add a comment to a post
  async create(createCommentDto: CreateCommentDto) {
    const { content, postId, authorId } = createCommentDto;

    const post = await this.postRepository.findOne({ where: { id: postId } });
    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });

    if (!post || !author) {
      throw new Error('Post or Author not found!');
    }

    const newComment = this.commentRepository.create({
      content,
      post,
      author,
    });

    return this.commentRepository.save(newComment);
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
