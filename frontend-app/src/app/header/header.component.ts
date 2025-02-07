import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { AuthService } from 'src/services/auth.service';

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
  

  constructor(
    private router: Router, 
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }

  navigateToLogout(): void {
    this.authService.logout()
    this.router.navigate(['/login']);
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