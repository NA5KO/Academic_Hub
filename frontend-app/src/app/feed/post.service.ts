import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:3000/posts';

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
}
