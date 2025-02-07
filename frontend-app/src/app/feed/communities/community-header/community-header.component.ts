import { Component, OnInit } from '@angular/core';
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

  constructor(
    private communityService: CommunitiesService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Listen for route changes
    this.route.paramMap.subscribe(params => {
      const communityName = params.get('name');
      if (communityName) {
        this.loadCommunity(communityName);
      }
    });
  }

  loadCommunity(communityName: string) {
    this.communityService.getCommunity(communityName).subscribe((data) => {
      this.community = data;
      this.checkIfFollowing();
    });
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
}
