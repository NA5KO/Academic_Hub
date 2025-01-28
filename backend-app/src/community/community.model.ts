import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/BaseEntity';
import { Post } from '../post/post.model';
import { Admin } from 'src/admin/admin.model';

@Entity('Community')
export class Community extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('text', { array: true, nullable: true })
  keywords: string[];

  @OneToMany(() => Post, (post) => post.community, { cascade: ['insert', 'update'] })
  posts: Post[];

  @ManyToOne(() => Admin, (admin) => admin.communities)
  admin: Admin;
}
