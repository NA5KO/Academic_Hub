import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Post } from 'src/post/post.model';
import { Entity, Column, ManyToOne } from 'typeorm';


@Entity('comment')
export class Comment extends BaseEntity {
  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  
  

}
