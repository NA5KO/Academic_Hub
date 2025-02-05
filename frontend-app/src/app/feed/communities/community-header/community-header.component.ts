import { Component, Input, OnInit } from '@angular/core';
import { CommunitiesService } from 'src/services/communities.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-community-header',
  templateUrl: './community-header.component.html',
  styleUrls: ['./community-header.component.css', '../../posts/post-list/post-list.component.css'],
  standalone: false,

})
export class CommunityHeaderComponent implements OnInit {

  isFollowing: boolean = false;
  userId: string = this.authService.checkAuthToken() ? this.authService.getUserIdFromLocalStorage() : '';

  // check this later
  isAdmin: boolean = false;

  constructor(
    private communityService: CommunitiesService, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  community = {
    id: '',
    name: '',
    description: '',
    banner: '',
    icon: '',
    followersCount: 0,
    keywords: [],
    posts: []
  };


  ngOnInit(): void {
    const communityName = this.route.snapshot.paramMap.get('name');
    if(communityName){
      this.communityService.getCommunity(communityName).subscribe((data) => {
        this.community = data;
        this.checkIfFollowing();
      });
    }
    // this.isAdmin = this.authService.isAdmin();
    }

    checkIfFollowing() {
      if (this.community.id) {
        this.communityService.isFollowing(this.userId, this.community.id).subscribe((isFollowing) => {
          this.isFollowing = isFollowing;
        });
      }
    }

    followCommunity() {
      if (!this.isFollowing) {
        this.communityService.followCommunity(this.userId, this.community.id).subscribe(() => {
          this.isFollowing = true;
          this.community.followersCount++;
        });
      } else {
        this.communityService.unfollowCommunity(this.userId, this.community.id).subscribe(() => {
          this.isFollowing = false;
          this.community.followersCount--;
        });
      }
    }
  

    // mch mawjouda fl front
    editCommunity() {
      console.log('Editing community');
      // Handle community edit logic here
    }
}