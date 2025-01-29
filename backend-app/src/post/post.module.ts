import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.model';
import { Comment } from 'src/comment/comment.model';
import { User } from 'src/user/user.model';
import { Community } from 'src/community/community.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, User, Community])
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService, TypeOrmModule]
})
export class PostModule {}
