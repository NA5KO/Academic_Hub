import { BaseEntity } from '../common/entities/BaseEntity';
import { User } from '../user/user.model';
import { Entity, Column, ManyToOne } from 'typeorm';


@Entity('Notification')
export class Notification extends BaseEntity {
  
  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

}
