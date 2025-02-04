import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/entities/BaseEntity';
import { Post } from '../post/post.model';
import { Comment } from '../comment/comment.model';
import { Notification } from 'src/notification/notification.model';
import { Community } from 'src/community/community.model';

@Entity('User')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: true }) 
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  github?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  degree?: string;

  @Column({ nullable: true })
  specialization?: string;

  @Column({ nullable: true })
  skills?: string;

  @Column({ nullable: true })
  profession?: string;

  @Column({ nullable: true })
  program?: string;

  @Column({ nullable: true })
  photoUrl?: string; 

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Community, (community) => community.followers, { cascade: true })
  @JoinTable()
  communities: Community[];

  @OneToMany(() => Community, (community) => community.creator)
  createdCommunities: Community[];
}


