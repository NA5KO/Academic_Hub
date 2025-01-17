import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  standalone: false
})
export class LeftMenuComponent {
  menuItems = [
    { icon: 'fa-regular fa-newspaper', label: 'News Source' },
    { icon: 'fa-solid fa-magnifying-glass', label: 'Discover' },
    { icon: 'fa-solid fa-question', label: 'Questions' },
    { icon: 'fa-solid fa-book', label: 'Articles' },
    { icon: 'fa-solid fa-fire', label: 'Top Communities' },
    { icon: 'fa-solid fa-plus', label: 'Create a community' },
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
