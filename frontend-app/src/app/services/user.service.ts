import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/email/${email}`);
  }

  followUser(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/email/${email}/follow`, {});
  }

  unfollowUser(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/email/${email}/unfollow`, {});
  }

 // getUser(userId: string): Observable<any> {
  //  return this.http.get(`${this.apiUrl}/${userId}`);
  //}

  //followUser(userId: string): Observable<any> {
    //return this.http.post(`${this.apiUrl}/${userId}/follow`, {});
//}

  //unfollowUser(userId: string): Observable<any> {
    //return this.http.post(`${this.apiUrl}/${userId}/unfollow`, {});
  //}



  ///getUserComments(userId: string): Observable<any> {
    //return this.http.get(`${this.apiUrl}/${userId}/comments`);
  //}


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
