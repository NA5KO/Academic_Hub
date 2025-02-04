import { Component } from '@angular/core';
import { RightMenuModule } from "../right-menu/right-menu.module";
import { PostsComponent } from "../posts/posts.component";
import { LeftMenuModule } from "../left-menu/left-menu.module";
import { CommentsComponent } from "../comments/comments.component";
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  imports: [RightMenuModule, PostsComponent, LeftMenuModule, CommentsComponent]
})
export class UserPageComponent {
  user = {
    id:'1',
    name: 'Ines Zghal ',
    bio: 'bio will be here!',
    location: 'Tunisie',
    joinedDate: '1 October 2022',
    followers: 5,
    following: 7
  };
  isAdmin: boolean = true; 

  handleDeleteUser() {
    console.log(`${this.user.name}'s profile has been deleted.`);
  }
}
