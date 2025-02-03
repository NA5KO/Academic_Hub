import { BaseEntity } from 'src/common/entities/BaseEntity';
import { PostType } from 'src/enums/post-type.enum';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from '../comment/comment.model';
import { Community } from '../community/community.model';
import { User } from '../user/user.model';

@Entity('Post')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column("text", { array: true })
  tags: string[];

  @Column()
  type: PostType;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;

  @Column({ default: 0 })
  saves: number;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @ManyToOne(() => Community, (community) => community.posts)
  community: Community;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
