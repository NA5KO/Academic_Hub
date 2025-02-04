import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth-guard';
import { GetUser } from '../user/Decorator/user.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@GetUser() user, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  // all posts (discover)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

// Upvote a post
  @Put(':id/upvote')
  upvote(@Param('id') id: string) {
    return this.postService.upvote(id);
  }

  // Downvote a post
  @Put(':id/downvote')
  downvote(@Param('id') id: string) {
    return this.postService.downvote(id);
  }

  // Save a post
  @Put(':id/save')
  save(@Param('id') id: string, @Body('userId') userId: string) {
    return this.postService.save(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
