// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserService } from './user.service';
import { Post } from '../post/post.model';
import { Community } from '../community/community.model';
import { Notification } from 'src/notification/notification.model';
import { Comment } from 'src/comment/comment.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Notification, Post, Comment, Community])
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}