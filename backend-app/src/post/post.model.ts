import { BaseEntity } from 'src/common/entities/BaseEntity';
import { PostType } from 'src/enums/post-type.enum';
import { Entity, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Comment } from 'src/comment/comment.model';
import { Community } from 'src/community/community.model';


@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  authorId: number;
  
  @Column()
  tags: string[];
  @Column()
  type: PostType

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @ManyToOne(() => Community, (community) => community.posts,{ cascade: true })
  community: Community;
  
  

}
