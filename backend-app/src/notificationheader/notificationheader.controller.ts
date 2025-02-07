import { Controller, Sse, Req, Res, MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostCommentAdded } from '../comment/comment.event';
import { Observable, fromEventPattern, merge, map, filter, takeUntil } from 'rxjs';

@Controller('notification')
export class NotificationheaderController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Sse('/comments')
  commentNotifications(@Req() req, @Res() res): Observable<MessageEvent> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('SSE Connection Established');

    return merge(
      fromEventPattern<PostCommentAdded>(
        (handler) => this.eventEmitter.on(PostCommentAdded.EVENT_NAME, handler),
        (handler) => this.eventEmitter.off(PostCommentAdded.EVENT_NAME, handler)
      ).pipe(
        filter((event) => {
          console.log('Received event:', event);
          return event.postId === req.session?.user?.id;
        }),
        map((event) => {
          const notificationData = {
            message: `New comment on your post: ${event.content}`,
            postId: event.postId,
            commenterId: event.commenterId,
            content: event.content,
          };

          console.log('Sending notification:', notificationData);
          
          // Send JSON event stream
          return { data: JSON.stringify(notificationData) };
        })
      )
    ).pipe(
      takeUntil(
        new Observable<void>((observer) => {
          req.on('close', () => {
            console.log('SSE Connection Closed');
            observer.next();
            observer.complete();
          });
        })
      )
    );
  }
}
