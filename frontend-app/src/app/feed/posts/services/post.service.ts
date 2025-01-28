import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private baseUrl = 'http://localhost:3000/posts';
  private allPosts = [
    {
      id: 1,
      image: '../../../../assets/nourhen.jpg',
      community: 'Figma',
      author: 'Nourhen Khechine',
      time: '3 minutes ago',
      content: 'How Do I Solve This Problem on Figma?',
      tags: ['#Figma'],
      comments: 3,
      upvotes: 48,
      downvotes: 0,
      isSaved: false,
      category: 'news-source'
    },
    {
      id: 2,
      image: '../../../../assets/amine.jpg',
      community: 'K8s',
      author: 'Amen Dhouibi',
      time: '3 minutes ago',
      content: 'Read this article about K8s!!!',
      tags: ['#Kubernetes'],
      comments: 11,
      upvotes: 23,
      downvotes: 1,
      isSaved: false,
      category: 'discover'
    },
    { id: 3, 
      image: '../../../../assets/amine.jpg',
      community: 'WD',
      author: 'Amen Dhouibi',
      time: '3 minutes ago',
      content: 'What is a REST API?',
      tags: ['#Questions'],
      comments: 11,
      upvotes: 23,
      downvotes: 1,
      isSaved: false,
      category: 'questions' },
  ];

  constructor(private http: HttpClient) {}

  upvotePost(postId: number) {
    return this.http.put(`${this.baseUrl}/${postId}/upvote`, {});
  }

  downvotePost(postId: number) {
    return this.http.put(`${this.baseUrl}/${postId}/downvote`, {});
  }

  savePost(postId: number, userId: number) {
    return this.http.put(`${this.baseUrl}/${postId}/save`, { userId });
  }

  commentPost(postId: number, userId: number, text: string) {
    return this.http.put(`${this.baseUrl}/${postId}/comment`, { userId, text });
  }

  getPosts(filter: string): any[] {
    if (!filter || filter === 'discover') {
      return this.allPosts; // Return all posts for 'discover'
    }
    return this.allPosts.filter((post) => post.category === filter);
  }
}
