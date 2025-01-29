import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Post } from 'src/post/post.model';
import { Entity, Column, OneToMany } from 'typeorm';


@Entity('community')
export class Community extends BaseEntity {
  @Column()
  name: string;

  @Column()
  keywords: string[];

  @Column()
  description: string;
  
  @Column()
  banner: string;
  
  @Column()
  icon: string;

  @OneToMany(() => Post, (post) => post.community, { cascade: true })
  posts: Post[];
  

}
