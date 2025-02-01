import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private baseUrl = 'http://localhost:3000/post';
  private post =
    {
      id: "",
      title: "",
      content: "",
      tags: [],
      type: "",
      communityId: "",
      authorId: ""
    };
  private allPosts = [
    {
      id: "",
      title: "",
      content: "",
      tags: [],
      type: "",
      communityId: "",
      authorId: ""
    }
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

  commentPost(postId: string, userId: string, text: string) {
    return this.http.put(`${this.baseUrl}/comment/${postId}`, { userId, text });
  }

  getPostById(postId: string) {
    return this.http.get(`${this.baseUrl}/${postId}`);
  }

  getPosts(filter: string = '') {
    return this.http.get(`${this.baseUrl}?filter=${filter}`);
  }

  getAllPosts(){
    return this.http.get(`${this.baseUrl}`);
  }
}
