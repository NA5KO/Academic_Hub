import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificationheader } from './notificationheader.model';
import { User } from 'src/user/user.model';
import { NotificationheaderService } from './notificationheader.service';
import { NotificationheaderController } from './notificationheader.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notificationheader,User])],
  controllers: [NotificationheaderController],
  providers: [NotificationheaderService],
})
export class NotificationheaderModule {}
