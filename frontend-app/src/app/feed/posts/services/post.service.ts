import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCommentDto } from '../../../../../../backend-app/src/comment/dto/create-comment.dto';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  upvotePost(postId: number) {
    return this.http.put(`${this.baseUrl}/post/${postId}/upvote`, {});
  }

  downvotePost(postId: number) {
    return this.http.put(`${this.baseUrl}/post/${postId}/downvote`, {});
  }

  savePost(postId: number, userId: string) {
    return this.http.put(`${this.baseUrl}/post/${postId}/save`, { userId });
  }

  commentPost(postId: string, authorId: string, createCommentDto: CreateCommentDto) {
    return this.http.post(`${this.baseUrl}/comment`, {
      ...createCommentDto,
      postId: postId,
      authorId: authorId,
    });
  }

  getPostById(postId: string) {
    return this.http.get(`${this.baseUrl}/post/${postId}`);
  }

  getPosts(filter: string = '') {
    return this.http.get(`${this.baseUrl}/post?filter=${filter}`);
  }

  getAllPosts(){
    return this.http.get(`${this.baseUrl}/post`);
  }
}
