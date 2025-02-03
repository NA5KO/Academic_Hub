import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.model';
import { Post } from '../post/post.model';
import { User } from '../user/user.model';
import { CommentRepository } from './comment.repository';
import { DataSource } from 'typeorm';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Post, User]),
    forwardRef(() => PostModule),
    UserModule
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: CommentRepository,
      useFactory: (dataSource: DataSource) => new CommentRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [CommentService, CommentRepository]
})
export class CommentModule {}
