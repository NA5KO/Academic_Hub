import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.model';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Notificationheader {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;



  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  author: User;
}
