import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommunitiesService } from 'src/services/communities.service';
import { FeedService } from 'src/services/feed.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  standalone: false,
})
export class LeftMenuComponent implements OnInit {
  menuItems = [
    { icon: 'fa-regular fa-newspaper', label: 'News Source', route: '/post', queryParams: { filter: 'news source' } },
    { icon: 'fa-solid fa-magnifying-glass', label: 'Discover', route: '/post', queryParams: { filter: '' } },
    { icon: 'fa-solid fa-question', label: 'Questions', route: '/post', queryParams: { filter: 'question' } },
    { icon: 'fa-solid fa-book', label: 'Articles', route: '/post', queryParams: { filter: 'article' } }
  ];

  communityItem = [
    { icon: 'fa-solid fa-fire', label: 'Top Communities', route: '/communities' },
    { icon: 'fa-solid fa-plus', label: 'Create a community', route: '/create-community' },
  ];

  followedCommunities: any[] = [];
  createdCommunities: any[] = [];
  userId: string = '';

  constructor(
    private postService: FeedService, 
    private authService: AuthService,
    private communityService: CommunitiesService,
    private router: Router) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromLocalStorage(); 

    if (this.userId) {
      this.communityService.getFollowedCommunities(this.userId).subscribe((data) => {
        this.followedCommunities = data;
      });

      this.communityService.getCreatedCommunities(this.userId).subscribe((data) => {
        console.log(data)
        this.createdCommunities = data;
      });
    }
  }

  onMenuItemClick(filter: string) {
    this.postService.getPostsByFilter(filter).subscribe(posts => {
      console.log(posts);
    });

    this.router.navigate(['/post'], { queryParams: { filter: filter } });
  }

  onCommunityItemClick(name: string) {
    this.router.navigate([name]); 
  }

  onCommunityClick(name: string) {
    this.router.navigate(['/community', name]); 
  }
}
