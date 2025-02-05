import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts = [
    {
      user: 'janedoe',
      avatar: 'assets/user.jpg',
      timePosted: '3 hours ago',
      title: 'How Do I Solve This Problem on Instagram?',
      tags: ['#instagram', '#soru'],
      comments: 3,
      upvotes: 3,
      downvotes: 3,
      likes: ['assets/user.jpg', 'assets/user.jpg']
    },
    {
      user: 'johndoe',
      avatar: 'assets/user.jpg',
      timePosted: '2 days ago',
      title: 'Anyone Know a Good Recipe for Lasagna?',
      tags: ['#recipe', '#cooking'],
      comments: 5,
      upvotes: 10,
      downvotes: 1,
      likes: ['assets/user.jpg', 'assets/user.jpg']
    }
  ];
}
