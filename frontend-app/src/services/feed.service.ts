import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
    private apiUrl = 'http://localhost:3000/post'; 

  constructor(private http: HttpClient) {}

  getPostsByFilter(filter: string): Observable<any[]> {
    const params = new HttpParams().set('filter', filter);
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
