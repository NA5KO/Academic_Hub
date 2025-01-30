import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  followUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/follow`, {});
  }

  unfollowUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/unfollow`, {});
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
