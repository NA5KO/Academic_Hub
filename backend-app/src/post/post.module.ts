import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.model';
import { Comment } from 'src/comment/comment.model';
import { User } from 'src/user/user.model';
import { Community } from 'src/community/community.model';
import { DataSource } from 'typeorm';
import { PostRepository } from './post.repository';
import { UserModule } from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, User, Community]),UserModule,CommentModule,CommunityModule
  ],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: PostRepository,
      useFactory: (dataSource: DataSource) => new PostRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [PostService, PostRepository],
})
export class PostModule {}
