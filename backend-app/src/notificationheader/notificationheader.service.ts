import {  Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentAdded } from '../comment/comment.event';  
import { User } from '../user/user.model';
import { Notificationheader } from './notificationheader.model';

@Injectable()
export class NotificationheaderService implements OnModuleDestroy, OnModuleInit {
  constructor(
    @InjectRepository(Notificationheader) private notificationRepo: Repository<Notificationheader>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private eventEmitter: EventEmitter2
  ) { }

  onModuleInit() {
    this.eventEmitter.on(PostCommentAdded.EVENT_NAME, async (ev: PostCommentAdded) => {
      const message = `New comment on your post: ${ev.content}`;
      const postId = Number(ev.postId);
      const commenterId = Number(ev.commenterId);
     
      this.addNotificationToPostOwner(postId, commenterId, message)
        .catch(err => console.error(err));
    });
  }

  onModuleDestroy() {
    this.eventEmitter.removeAllListeners(PostCommentAdded.EVENT_NAME);
  }


  async getAll(user: User): Promise<Notificationheader[]> {
    return await this.notificationRepo.find({
      where: { author: user },
      order: { createdAt: 'DESC' },
    });
  }

 
  async addNotificationToPostOwner(postId: number, commenterId: number, message: string) {

    const postOwner = await this.getPostOwner(postId);
    if (!postOwner) {
      console.error('Post owner not found');
      return;
    }

    
    const newNotification = this.notificationRepo.create({
      message,
      author: postOwner, 
    });

    await this.notificationRepo.save(newNotification);
  }


  async getPostOwner(postId: number): Promise<User | undefined> {
    
    return this.userRepo.findOne({ where: { id: String(1) } }); 
  }
}
