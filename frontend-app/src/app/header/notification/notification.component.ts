import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

interface Notification {
  id: number;
  message: string;
  createdAt: string;
  userId: number;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.listenForNewNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(response => {
      this.notifications = response.notifications;
    });
  }

  listenForNewNotifications(): void {
    this.notificationService.listenForNotifications().subscribe(notification => {
      this.notifications.unshift(notification);  // Add the new notification at the top
    });
  }

  closeNotification(): void {
    // Logic to close the dropdown
  }
}
