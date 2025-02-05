import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CommunityModule } from './community/community.module';
import { NotificationModule } from './notification/notification.module';
import { Community } from './community/community.model';
import { User } from './user/user.model';
import { Post } from './post/post.model';
import { Comment } from './comment/comment.model';
import { Notification } from './notification/notification.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      entities: [User, Post, Comment, Community, Notification],
      synchronize: true,
      retryAttempts: 0,
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    CommunityModule,
    NotificationModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
