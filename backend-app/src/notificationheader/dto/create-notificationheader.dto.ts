import { IsString, IsDate } from 'class-validator';

export class NotificationheaderDto {
  id: number;

  @IsString()
  message: string;

  @IsDate()
  createdAt: Date;

  userId: number;  
}
