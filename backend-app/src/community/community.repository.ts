import { Community } from './community.model';
import { GenericRepository } from 'src/common/repositories/GenericRepository';  // Ensure this path is correct
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CommunityRepository extends GenericRepository<Community> {
    constructor(private readonly dataSource: DataSource) {
        super(Community, dataSource);
      }
  // Custom methods for Community can be added here if needed
}
