import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://your-backend-api.com/posts'; // URL taa lbackend api !

  constructor(private http: HttpClient) {}

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // lenna e logique taa lauthentification(verification de l'authentification)
    const token = localStorage.getItem('authToken');
    return !!token; // Renvoie true si un token existe
  }

  // Envoyer une requête POST pour créer un post
  createPost(postDto: any): Observable<any> {
    return this.http.post(this.apiUrl, postDto).pipe(
      catchError((error) => {
        console.error('Error creating post:', error);
        return throwError(() => error);
      })
    );
  }
}
