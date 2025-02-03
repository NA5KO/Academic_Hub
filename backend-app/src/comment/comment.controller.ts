import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  // @UseGuards(AuthGuard) 
  async create(
    @Body() createCommentDto: CreateCommentDto,  // Get the entire body
    // @Request() req: any,  // Access the authenticated user
  ) {
    // const userId = req.user.id;
    const userId = "fe7dd07f-804f-4f7e-aea2-0de2a40d5aba";
    return this.commentService.createComment(createCommentDto.postId, userId, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
