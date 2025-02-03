import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostType } from 'src/enums/post-type.enum';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  // with filter
  @Get()
  async getPostsByType(@Query('filter') filter: string) {
    if (!Object.values(PostType).includes(filter as PostType)) {
      return this.postService.findAll(); // if the filter is not valid it returns all posts (discover mode)
    }

    const postType = filter as PostType;
    return await this.postService.getPostsByType(postType);
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
