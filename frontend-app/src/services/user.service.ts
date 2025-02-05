import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  bio: string;
  location: string;
  joinedDate: string;
  followers: number;
  following: number;
  // ajoutez d'autres propriétés selon votre modèle
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Vous pouvez stocker l’url de base dans un fichier d'environnement
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Récupérer le profil d'un utilisateur par son ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Mettre à jour le profil d'un utilisateur
  updateUser(id: string, updateData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, updateData);
  }

  // Méthode pour suivre un utilisateur
  followUser(followerId: string, followingId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${followingId}/follow`, { followerId });
  }

  // Méthode pour ne plus suivre un utilisateur
  unfollowUser(followerId: string, followingId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${followingId}/unfollow`, { followerId });
  }
}
