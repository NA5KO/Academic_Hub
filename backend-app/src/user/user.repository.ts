import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { GenericRepository } from 'src/common/repositories/GenericRepository';  // Ensure this path is correct
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends GenericRepository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource);
      }
  // You can add custom methods for User here if needed
}
