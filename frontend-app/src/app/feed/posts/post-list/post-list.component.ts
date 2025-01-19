import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts = [
    {
      id: 1,
      author: 'Figma/Nourhen Khechine',
      time: '3 minutes ago',
      content: 'How Do I Solve This Problem on Figma?',
      tags: ['#Figma'],
      comments: 3,
      upvotes: 48,
      downvotes: 0
    },
    {
      id: 2,
      author: 'K8s/Amen Dhouibi',
      time: '3 minutes ago',
      content: 'Read this article about K8s!!!',
      tags: ['#Kubernetes'],
      comments: 11,
      upvotes: 23,
      downvotes: 1
    }
  ];
}
