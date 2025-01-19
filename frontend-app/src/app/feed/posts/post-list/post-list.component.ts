import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts = [
    {
      author: 'Figma/Ines Zghal',
      time: '3 minutes ago',
      content: 'How Do I Solve This Problem on Figma?',
      tags: ['#Figma'],
      comments: 3,
      upvotes: 48,
      downvotes: 0
    },
    {
      author: 'K8s/Amen Dhouibi',
      time: '3 minutes ago',
      content: 'Read this article about K8s!!!',
      tags: ['#Kubernetes'],
      comments: 3,
      upvotes: 48,
      downvotes: 0
    }
  ];
}
