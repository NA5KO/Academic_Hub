import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from 'src/services/communities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-header',
  templateUrl: './community-header.component.html',
  styleUrls: ['./community-header.component.css'],
  standalone: false,

})
export class CommunityHeaderComponent implements OnInit {

  constructor(private communityService: CommunitiesService, private route: ActivatedRoute) {}
  // constructor(private authService: AuthService) {}

  community = {
    name: '',
    description: '',
    banner: '',
    icon: '',
    followersCount: 0,
    keywords: []
  };

  isAdmin: boolean = false;
  isUser: boolean = true;

  ngOnInit(): void {
    const communityName = this.route.snapshot.paramMap.get('name');
    if(communityName){
      this.communityService.getCommunity(communityName).subscribe((data) => {
        console.log(data);
        this.community = data;
      });
    }
    // this.isAdmin = this.authService.isAdmin();
    // this.isUser = this.authService.isUser();
  }

  followCommunity() {
    console.log('Following community');
    // Handle follow community logic here
  }

  // mch mawjouda fl front
  editCommunity() {
    console.log('Editing community');
    // Handle community edit logic here
  }

  reportUser() {
    console.log('Reporting user');
    // Handle report user logic here
  }
}