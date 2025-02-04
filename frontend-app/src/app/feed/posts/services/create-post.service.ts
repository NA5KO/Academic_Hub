import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  // Import the 'map' operator

export interface Community {
  id: string;
  name: string;
  creator?: { id: string; name?: string };
  followers?: { id: string; name?: string }[];
  // You can include other properties if needed
}

@Injectable({
  providedIn: 'root'
})
export class PostCreateService {

  private apiUrl = `http://localhost:3000/post`;  // Adjust API endpoint accordingly

  constructor(private http: HttpClient) {}

  // Fetch communities from the backend API
  fetchCommunities(): Observable<Community[]> {
    return this.http.get<Community[]>('http://localhost:3000/community'); // Adjust URL if necessary
  }


  // Retrieve the author ID from local storage (assuming JWT token structure)
  getAuthorIdFromLocalStorage(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));  // Decode JWT token payload
      return payload.sub || '';  // Use 'sub' as the user ID field from the JWT payload
    }
    return '';
  }

  // Create the post by sending the post data to the backend
  createPost(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Ensure correct content type for the post
    });

    return this.http.post<any>(this.apiUrl, postData, { headers }).pipe(
      catchError((error) => {
        console.error('Error creating post:', error);
        return throwError(error);  // Pass the error for further handling
      })
    );
  }
  }

