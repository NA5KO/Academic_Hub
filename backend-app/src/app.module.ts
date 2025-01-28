import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CommunityModule } from './community/community.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PostModule, CommentModule, CommunityModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
