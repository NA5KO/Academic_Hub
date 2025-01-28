import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from 'src/user/user.model';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [User]
})
export class AdminModule {}
