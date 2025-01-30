import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.model';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, User])
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService, TypeOrmModule]
})
export class CommentModule {}
