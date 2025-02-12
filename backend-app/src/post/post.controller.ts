import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth-guard';
import { GetUser } from '../user/Decorator/user.decorator';
import { PostType } from 'src/enums/post-type.enum';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  create(@GetUser() user ,@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }
  
  // all posts (discover)
  @Get("post/discover")
  findAll() {
    return this.postService.findAll();
  }

  // with filter
  @Get("post")
  async getPostsByType(@Query('filter') filter: string) {
    // Ensure the filter is a valid PostType
    if (!Object.values(PostType).includes(filter as PostType)) {
      return this.postService.findAll();
    }

    const postType = filter as PostType;
    return await this.postService.getPostsByType(postType);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  // Upvote a post
  @Post('post/:id/upvote')
  upvote(@Param('id') id: string) {
    return this.postService.upvote(id);
  }

  @Post('post/:id/unupvote')
  unupvote(@Param('id') id: string) {
    return this.postService.unupvote(id);
  }

  // Downvote a post
  @Post('post/:id/downvote')
  downvote(@Param('id') id: string) {
    return this.postService.downvote(id);
  }

  @Post('post/:id/undownvote')
  undownvote(@Param('id') id: string) {
    return this.postService.undownvote(id);
  }

  // Save a post
  @Post('post/:id/save')
  save(@Param('id') id: string, @Body('userId') userId: string) {
    return this.postService.save(id);
  }

  @Post('post/:id/unsave')
  unsave(@Param('id') id: string, @Body('userId') userId: string) {
    return this.postService.unsave(id);
  }

  @Patch('post/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete('post/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
