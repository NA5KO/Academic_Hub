import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() user!: {
    id: string;
    name: string;
    bio: string;
    location: string;
    joinedDate: string;
    followers: number;
    following: number;
  };

  @Input() isAdmin: boolean = false;
  isFollowing = false;

  constructor(private userService: UserService) {}

  toggleFollow() {
    if (this.isFollowing) {
      this.userService.unfollowUser(this.user.id).subscribe(() => {
        this.isFollowing = false;
        this.user.followers -= 1;
      });
    } else {
      this.userService.followUser(this.user.id).subscribe(() => {
        this.isFollowing = true;
        this.user.followers += 1;
      });
    }
  }

  deleteUser() {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.userService.deleteUser(this.user.id).subscribe(() => {
        alert("Utilisateur supprimé avec succès !");
      });
    }
  }
}