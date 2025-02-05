import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';
import { Entity, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';

@Entity('Community')
export class Community extends BaseEntity {
  @Column()
  name: string;

  @Column('text', { array: true, nullable: false, default: '{}' })
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

  @ManyToOne(() => User, (user) => user.createdCommunities)
  creator: User;

  @Column({ default: 0 })
  followersCount: number;
}
