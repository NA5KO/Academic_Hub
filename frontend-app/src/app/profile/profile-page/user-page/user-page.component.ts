import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  user = {
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