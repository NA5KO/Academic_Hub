import { Component } from '@angular/core';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts = [
    {
      id: 1,
      image: '../../../../assets/nourhen.jpg',
      author: 'Figma/Nourhen Khechine',
      time: '3 minutes ago',
      content: 'How Do I Solve This Problem on Figma?',
      tags: ['#Figma'],
      comments: 3,
      upvotes: 48,
      downvotes: 0,
      isSaved: false,
    },
    {
      id: 2,
      image: '../../../../assets/amine.jpg',
      author: 'K8s/Amen Dhouibi',
      time: '3 minutes ago',
      content: 'Read this article about K8s!!!',
      tags: ['#Kubernetes'],
      comments: 11,
      upvotes: 23,
      downvotes: 1,
      isSaved: false,
    },
  ];

  userId = 1; // Current logged-in user's ID (replace with dynamic value)
}
