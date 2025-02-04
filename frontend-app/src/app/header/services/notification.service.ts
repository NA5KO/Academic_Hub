/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${process.env['NG_APP_API_SERVER_URL']}/notifications`;
  private unreadCount = new BehaviorSubject<number>(0);
  private notifications = new BehaviorSubject<Notification[]>([]);

  constructor(private http: HttpClient) {
    this.initializeEventSource();
  }


  private initializeEventSource() {
    const eventSource = new EventSource(`${this.apiUrl}/count`, { withCredentials: true });

    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.unreadCount.next(data.unreadCount || 0);
    });
  }


  getUnreadCount(): Observable<number> {
    return this.unreadCount.asObservable();
  }

  
  fetchNotifications(): Observable<{ notifications: Notification[] }> {
    return this.http.get<{ notifications: Notification[] }>(`${this.apiUrl}`).pipe(
      tap(response => {
        this.notifications.next(response.notifications);
        this.unreadCount.next(0); 
      })
    );
  }

  
  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }
}
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = [
    { avatar: '../../assets/amine.jpg', title: 'Amine', message: 'commented on your post', time: 'Friday 2:20pm - Sep 20, 2024', unread: true },
    { avatar: '../../assets/nourhen.jpg', title: 'Nounou', message: 'upvoted your post', time: 'Friday 10:04am - Sep 20, 2024', unread: true },
    { avatar: '../../assets/inesb.jpg', title: 'Ines', message: 'downvoted your post', time: 'Thursday 2:20pm - Sep 20, 2024', unread: false }
  ];

  getNotifications() {
    return this.notifications;
  }

  markAllAsRead() {
    this.notifications.forEach(notification => notification.unread = false);
  }
}