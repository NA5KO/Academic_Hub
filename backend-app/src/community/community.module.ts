import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.model';
import { User } from 'src/user/user.model';
import { Post } from 'src/post/post.model';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community, User, Post]),
    PostModule
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
  exports: [CommunityService, TypeOrmModule]
})
export class CommunityModule {}
