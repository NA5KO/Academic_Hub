import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.model';
import { User } from 'src/user/user.model';
import { Post } from 'src/post/post.model';
import { CommunityRepository } from './community.repository';
import { UserModule } from 'src/user/user.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Community, User, Post]), UserModule],
  controllers: [CommunityController],
  providers: [
    CommunityService,
    {
      provide: CommunityRepository,
      useFactory: (dataSource: DataSource) =>
        new CommunityRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [CommunityService, CommunityRepository],
})
export class CommunityModule {}
