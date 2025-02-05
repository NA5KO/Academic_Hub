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
    return this.http.get<any>(`${this.baseUrl}/post/${postId}`).pipe(
      map((data) => {
        // Provide default values if fields are null or undefined
        return {
          id: data.id,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          title: data.title ?? 'Untitled',
          content: data.content ?? '',
          tags: data.tags ?? [],
          type: data.type,
          upvotes: data.upvotes ?? 0,
          downvotes: data.downvotes ?? 0,
          saves: data.saves ?? 0,
          // For author, provide defaults if it is null
          author: data.author
            ? {
                ...data.author,
                photoUrl: data.author.photoUrl ?? 'assets/default-avatar.png',
                username: data.author.username ?? 'Anonymous',
              }
            : {
                photoUrl: 'assets/default-avatar.png',
                username: 'Anonymous',
              },
          // You can add additional fields here if needed
        };
      })
    );
  }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/post/discover`).pipe(
      map((posts) =>
        posts.map((data) => ({
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
                authorUsername: comment.authorUsername ?? 'Anonymous',
              }))
            : [],
          community: data.community
            ? {
                id: data.community.id,
                createdAt: data.community.createdAt,
                updatedAt: data.community.updatedAt,
                name: data.community.name ?? 'Unknown Community',
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
                username: data.author.username ?? 'Unknown User',
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
                photoUrl: data.author.photoUrl ?? null,
              }
            : null,
        }))
      )
    );
  }
  


  getPosts(filter: string = '') {
    return this.http.get(`${this.baseUrl}/post?filter=${filter}`);
  }

}
