import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';
import { Entity, Column, ManyToOne } from 'typeorm';


@Entity('Comment')
export class Comment extends BaseEntity {
  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
  
}
