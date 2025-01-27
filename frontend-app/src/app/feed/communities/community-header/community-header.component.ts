import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-header',
  templateUrl: './community-header.component.html',
  styleUrls: ['./community-header.component.css']
})
export class CommunityHeaderComponent implements OnInit {

  community = {
    name: 'Tech Community',
    description: 'This is a community description example.',
    banner: '../../../assets/background.jpeg',
    icon: '../../../assets/reddit.png'
  };

  isAdmin: boolean = false;
  isUser: boolean = true;

  // constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.isAdmin = this.authService.isAdmin();
    // this.isUser = this.authService.isUser();
  }

  followCommunity() {
    console.log('Following community');
    // Handle follow community logic here
  }

  editCommunity() {
    console.log('Editing community');
    // Handle community edit logic here
  }

  reportUser() {
    console.log('Reporting user');
    // Handle report user logic here
  }
}