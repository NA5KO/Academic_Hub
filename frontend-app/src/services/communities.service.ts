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
    return this.http.post(`${this.apiUrl}/community/create`, formData);
  }
}