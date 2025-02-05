import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
    private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getPostsByFilter(filter: string): Observable<any[]> {
    const params = new HttpParams().set('filter', filter);
    return this.http.get<any[]>(`${this.baseUrl}/post`, { params });
  }

  getRelatedCommunities(communityId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/community/${communityId}/related`);
  }
}
