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
    }];

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
