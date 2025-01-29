import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommunitiesService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000'; 

  getTopCommunities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/community/top`);
  }
}