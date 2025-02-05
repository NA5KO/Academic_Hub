import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';



interface Notification {
  avatar: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
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
  }

  loadNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
  }


  closeNotification(): void {
    // Logic to close the dropdown
  }
}