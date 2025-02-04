import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommunitiesService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000'; 

  getTopCommunities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/community/top`);
  }

  getCommunity(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/community/${name}`);
  }

  createCommunity(formData: any): Observable<any> {
    console.log(formData)
    return this.http.post(`${this.apiUrl}/community`, formData);
  }
  
  getPostsByCommunity(communityName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/community/${communityName}/posts`);
  }

  followCommunity(userId: string, communityId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/follow/${communityId}`, {});
  }

  unfollowCommunity(userId: string, communityId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}/unfollow/${communityId}`);
  }

  getFollowedCommunities(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/followed-communities`);
  }

  isFollowing(userId: string, communityId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/${userId}/is-following/${communityId}`);
  }
}