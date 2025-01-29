import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';
import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';


@Entity('Community')
export class Community extends BaseEntity {
  @Column()
  name: string;

  @Column("text", { array: true })
  keywords: string[];

  @Column()
  description: string;
  
  @Column()
  banner: string;
  
  @Column()
  icon: string;

  @OneToMany(() => Post, (post) => post.community, { cascade: true })
  posts: Post[];

  @ManyToMany(() => User, (user) => user.communities)
  followers: User[];
}
