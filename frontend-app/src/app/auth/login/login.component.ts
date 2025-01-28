import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private AuthService: AuthService
  ) { }
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please fill in both email and password.');
      return;
    }
    const loginData = {
      email: this.email,
      password: this.password,
      // rememberMe: this.rememberMe,
    };

    // Send POST request to the backend
    this.AuthService.loginWithEmail(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);

        // Store token in localStorage or sessionStorage
        if (this.rememberMe) {
          localStorage.setItem('authToken', response.token);
        } else {
          sessionStorage.setItem('authToken', response.token);
        }

        // Navigate to the dashboard or home page
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed: ' + (error.error?.message || 'Unknown error'));
      },
    });
  }
}