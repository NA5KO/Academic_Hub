import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000'; 

  getPostsByCommunity(communityName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/community/${communityName}/posts`);
  }
}