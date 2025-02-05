import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  user: string;
  avatar: string;
  timePosted: string;
  title: string;
  tags: string[];
  comments: number;
  upvotes: number;
  downvotes: number;
  likes: string[];
  // ajoutez d'autres propriétés si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000/users'; // Notez que votre controller propose /users/:userId/posts

  constructor(private http: HttpClient) {}

  // Récupérer les posts d'un utilisateur
  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/${userId}/posts`);
  }
}
