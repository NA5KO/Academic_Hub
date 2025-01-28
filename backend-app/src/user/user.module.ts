// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserService } from './user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [UserService],  
  controllers: [], 
  exports: [UserService, User],
})
export class UserModule {}