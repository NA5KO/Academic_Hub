import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://your-backend-api.com/profile'; // url backend api
  constructor(private http: HttpClient) {}

  // logique de verification de l'authentification de user !
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Retourne true si un token existe
  }

  // Mettre à jour le profil utilisateur
  updateProfile(profileDto: any): Observable<any> {
    return this.http.put(this.apiUrl, profileDto).pipe(
      catchError((error) => {
        console.error('Error updating profile:', error);
        return throwError(() => error);
      })
    );
  }
}
