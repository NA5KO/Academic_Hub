import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/BaseEntity';
import { Post } from '../post/post.model';
import { Notification } from '../notification/notification.model';
import { Comment } from '../comment/comment.model';

@Entity('User')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: true }) 
  password: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  githubId?: string;

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
  
  @OneToMany(() => Post, (post) => post.user, { cascade: ['remove'] }) // circular cascade issue fixed
  posts: Post[];

  @OneToMany(() => Notification, (notification) => notification.user, { cascade: ['remove'] })
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];
}


