// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserService } from './user.service';
import { Post } from '../post/post.model';
import { Community } from '../community/community.model';
import { Notification } from 'src/notification/notification.model';
import { Comment } from 'src/comment/comment.model';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { DataSource } from 'typeorm';
import { PostRepository } from 'src/post/post.repository';
import { CommentRepository } from 'src/comment/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Notification, Post, Comment, Community]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PostRepository,
    CommentRepository,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
