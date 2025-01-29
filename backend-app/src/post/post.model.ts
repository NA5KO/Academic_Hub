import { BaseEntity } from 'src/common/entities/BaseEntity';
import { PostType } from 'src/enums/post-type.enum';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from '../comment/comment.model';
import { Community } from '../community/community.model';
import { User } from '../user/user.model';


@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  authorId: number;
  
  @Column("text", { array: true })
  tags: string[];

  @Column()
  type: PostType

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @ManyToOne(() => Community, (community) => community.posts)
  community: Community;
  
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

}
