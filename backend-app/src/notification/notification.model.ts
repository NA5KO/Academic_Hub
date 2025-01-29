import { BaseEntity } from 'src/common/entities/BaseEntity';
import { Entity, Column } from 'typeorm';


@Entity('notifications')
export class Notification extends BaseEntity {
  @Column()
  message: string;

  

}
