import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GenericRepository } from 'src/common/repositories/GenericRepository';
import { Comment } from './comment.model';

@Injectable()
export class CommentRepository extends GenericRepository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(Comment, dataSource);
  }

  //find comments by author
  async findByAuthor(userId: string): Promise<Comment[]> {
    return this.find({ where: { author: { id: userId } } });
  }
}
