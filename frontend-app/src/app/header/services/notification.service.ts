import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';  // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<any>();  // Subject to emit new notifications

  constructor(private http: HttpClient) {}

  // Method to get existing notifications
  getNotifications(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notification`, { responseType: 'text' });
  }
  

  // Method to listen for new notifications using SSE
  listenForNotifications(): Observable<any> {
    const eventSource = new EventSource(`${environment.apiUrl}/notification/comments`);

    eventSource.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);  // Ensure the data is in JSON format
        this.notificationsSubject.next(notification);  // Emit the notification through the Subject
      } catch (error) {
        console.error('Failed to parse notification data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      if (eventSource.readyState === EventSource.CLOSED) {
        console.warn('SSE connection was closed.');
      }
    
    };

    return this.notificationsSubject.asObservable();  // Return the observable for the component to subscribe to
  }
}
