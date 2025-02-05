import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  title: string;
  text: string;
  // ajoutez d'autres propriétés si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:3000/users'; // Votre endpoint est /users/:userId/comments

  constructor(private http: HttpClient) {}

  // Récupérer les commentaires d'un utilisateur
  getUserComments(userId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/${userId}/comments`);
  }
}
