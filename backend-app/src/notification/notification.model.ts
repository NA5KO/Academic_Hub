import { BaseEntity } from 'src/common/entities/BaseEntity';
import { User } from 'src/user/user.model';
import { Entity, Column, ManyToOne } from 'typeorm';


@Entity('notifications')
export class Notification extends BaseEntity {
  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

}
