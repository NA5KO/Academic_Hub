import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.model';
import { User } from 'src/user/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService, TypeOrmModule]
})
export class NotificationModule {}
