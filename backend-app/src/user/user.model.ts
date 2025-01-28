import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/entities/BaseEntity';

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
}


