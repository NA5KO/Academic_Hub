import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent {
  isNotificationsOpen = false;
  unreadNotificationsCount = 0; 
  notifications: Notification[] = [];
  

  constructor(private router: Router, private notificationService: NotificationService) {}

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }

  navigateToEditProfile(): void {
    this.router.navigate(['profile/edit']);
  }


  
  
 /* ngOnInit() {
    this.notificationService.getUnreadCount().subscribe(count => {
      this.unreadNotificationsCount = count;
    });
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }
   */
  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
 

}