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
    return this.http.post(`${this.baseUrl}/post/${postId}/upvote`, {});
  }

  downvotePost(postId: number) {
    return this.http.post(`${this.baseUrl}/post/${postId}/downvote`, {});
  }

  savePost(postId: number) {
    return this.http.post(`${this.baseUrl}/post/${postId}/save`, {});
  }

  unupvotePost(postId: number) {
    return this.http.post(`${this.baseUrl}/post/${postId}/unupvote`, {});
  }

  undownvotePost(postId: number) {
    return this.http.post(`${this.baseUrl}/post/${postId}/undownvote`, {});
  }

  unsavePost(postId: number) {
    return this.http.post(`${this.baseUrl}/post/${postId}/unsave`, {});
  }

  commentPost(postId: string, authorId: string, createCommentDto: CreateCommentDto) {
    return this.http.post(`${this.baseUrl}/comment`, {
      ...createCommentDto,
      postId: postId,
      authorId: authorId,
    });
  }

  getPostById(postId: string) {
    return this.http.get(`${this.baseUrl}/id/${postId}`);
  }

  getPosts(filter: string = '') {
    return this.http.get(`${this.baseUrl}/post?filter=${filter}`);
  }

  getAllPosts(){
    return this.http.get(`${this.baseUrl}/post`);
  }
}
