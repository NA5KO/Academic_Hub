import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  popularTags = [
    { name: 'Javascript', count: 99 },
    { name: 'PHP', count: 99 },
    { name: 'Web Development', count: 99 },
    { name: 'CSS', count: 99 },
  ];

  favoriteCommunities = [
    { name: 'RT4', count: 99 },
    { name: 'Makrouna', count: 99 },
    { name: 'Nestjs channel', count: 99 },
    { name: '4070', count: 99 },
  ];

  constructor(private postService: FeedService, private router: Router) {}

  ngOnInit() {}

  onMenuItemClick(filter: string) {
    this.postService.getPostsByFilter(filter).subscribe(posts => {
      console.log(posts);
    });

    this.router.navigate(['/post'], { queryParams: { filter: filter } });
  }

  onCommunityItemClick(route: string) {
    this.router.navigate([route]);
  }
}
