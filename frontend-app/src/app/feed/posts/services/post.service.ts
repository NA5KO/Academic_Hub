import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCommentDto } from '../../../../../../backend-app/src/comment/dto/create-comment.dto';
import { map, Observable } from 'rxjs';

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
  getPostById(postId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/id/${postId}`).pipe(
      map((data) => this.transformPost(data))
    );
  }
  
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/post/discover`).pipe(
      map((posts) => posts.map((data) => this.transformPost(data)))
    );
  }
  
  getPosts(filter: string = '') {
    return this.http.get(`${this.baseUrl}/post?filter=${filter}`);
  }
  
  // Helper function to transform post data
  private transformPost(data: any): any {
    return {
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      title: data.title ?? 'Untitled',
      content: data.content ?? '',
      tags: data.tags ?? [],
      type: data.type ?? 'unknown',
      upvotes: data.upvotes ?? 0,
      downvotes: data.downvotes ?? 0,
      saves: data.saves ?? 0,
      comments: data.comments
        ? data.comments.map((comment: any) => ({
            id: comment.id,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            content: comment.content ?? '',
            authorUsername: comment.authorUsername ?? 'Academic Hub User',
          }))
        : [],
      community: data.community
        ? {
            id: data.community.id,
            createdAt: data.community.createdAt,
            updatedAt: data.community.updatedAt,
            name: data.community.name ?? 'Academic Hub Community',
            keywords: data.community.keywords ?? [],
            description: data.community.description ?? '',
            banner: data.community.banner ?? '',
            icon: data.community.icon ?? '',
            followersCount: data.community.followersCount ?? 0,
          }
        : null,
      author: data.author
        ? {
            id: data.author.id,
            createdAt: data.author.createdAt,
            updatedAt: data.author.updatedAt,
            username: data.author.username ?? 'Academic Hub User',
            email: data.author.email ?? '',
            isActive: data.author.isActive ?? false,
            phone: data.author.phone ?? '',
            location: data.author.location ?? '',
            linkedin: data.author.linkedin ?? '',
            github: data.author.github ?? '',
            bio: data.author.bio ?? '',
            degree: data.author.degree ?? '',
            specialization: data.author.specialization ?? '',
            skills: data.author.skills ?? '',
            profession: data.author.profession ?? '',
            program: data.author.program ?? '',
            photoUrl: data.author.photoUrl ?? '',
          }
        : null,
    };
  }
}
