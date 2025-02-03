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
    { icon: 'fa-solid fa-book', label: 'Articles', route: '/post', queryParams: { filter: 'article' } },
    { icon: 'fa-solid fa-fire', label: 'Top Communities', route: '/communities', queryParams: { filter: '' } },
    { icon: 'fa-solid fa-plus', label: 'Create a community', route: '/community', queryParams: { filter: '' } },
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
      // Handle the posts (you can store them in a variable or pass them to another component)
      console.log(posts);
    });

    // Navigate to the respective route with the filter as a query parameter
    this.router.navigate(['/post'], { queryParams: { filter: filter } });
  }
}
