import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {

  menuItems = [
    { icon: 'fa-regular fa-newspaper', label: 'News Source', route: '/posts', queryParams: { filter: 'news-source' } },
    { icon: 'fa-solid fa-magnifying-glass', label: 'Discover', route: '/posts', queryParams: { filter: 'discover' } },
    { icon: 'fa-solid fa-question', label: 'Questions', route: '/posts', queryParams: { filter: 'questions' } },
    { icon: 'fa-solid fa-book', label: 'Articles', route: '/posts', queryParams: { filter: 'articles' } },
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
}
