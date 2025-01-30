import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() user!: {
    name: string; 
    bio: string; 
    location: string; 
    joinedDate: string; 
    followers: number; 
    following: number;
  };

  @Input() isAdmin: boolean = false; 
  @Output() deleteUser = new EventEmitter<void>(); 

  isFollowing = false;

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  onDeleteProfile() {
    if (confirm(`Are you sure you want to delete ${this.user.name}'s profile?`)) {
      this.deleteUser.emit(); 
    }
  }
}