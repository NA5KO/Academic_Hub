import { Controller, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(
      createCommentDto.postId,
      createCommentDto.authorId,
      createCommentDto,
    );
  }
}
