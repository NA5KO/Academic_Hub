import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Post } from './post.model';
import { GenericRepository } from 'src/common/repositories/GenericRepository';

@Injectable()
export class PostRepository extends GenericRepository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource);
  }

  //find posts by author
  async findByAuthor(userId: string): Promise<Post[]> {
    return this.find({ where: { author: { id: userId } } });
  }

  //Fetch posts with their comments & community
  async findWithRelations(): Promise<Post[]> {
    return this.find({ relations: ['comments', 'community', 'author'] });
  }
}
