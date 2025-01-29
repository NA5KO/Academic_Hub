import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from 'src/services/communities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-header',
  templateUrl: './community-header.component.html',
  styleUrls: ['./community-header.component.css']
})
export class CommunityHeaderComponent implements OnInit {

  constructor(private communityService: CommunitiesService, private route: ActivatedRoute) {}
  // constructor(private authService: AuthService) {}

  community = {
    name: '',
    description: '',
    banner: '',
    icon: '',
  };


  isAdmin: boolean = false;
  isUser: boolean = true;

  ngOnInit(): void {
    const communityName = this.route.snapshot.paramMap.get('name');
    if(communityName){
      this.communityService.getCommunity(communityName).subscribe((data) => {
        console.log(data);
        this.community = data;
        this.community.banner= '../../../assets/background.jpeg';
        this.community.icon='../../../assets/reddit.png';
      });
    }
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