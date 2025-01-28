import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDto } from '../../../backend-app/src/auth/dto/login.dto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';  // URL to web api
  signUp(formData: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    bio: string;
    degree: string;
    specialization: string;
    skills: string;
    program: string;
    profession: string;
    photo: string; // photo as a URL or base64 string
  }): Observable<any> {
    console.log('Form data: Received', formData);
  
    // Log the content of formData for verification
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (value !== null && value !== undefined && value !== '') {
        console.log('Form data:', key, value);
      }
    });
  
    // Send the form data as JSON to the backend
    return this.http.post('http://localhost:3000/auth/signup', formData);
  }
  
  
  signUpWithGoogle(oauthData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/google/signup`, oauthData);
  }

  // Method to send Google OAuth data for login
  loginWithGoogle(oauthData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/google/login`, oauthData);
  }

  // Method for regular email/password sign-up
  signUpWithEmail(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post(`${this.apiUrl}/auth/signup`, data);
  }

  // Method for email/password login
  loginWithEmail(LoginDto : LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, LoginDto);
  }

  // Method to store JWT token in localStorage or cookies
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Method to retrieve the stored JWT token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Method to clear the JWT token when logging out
  logout(): void {
    localStorage.removeItem('authToken');
  }
}