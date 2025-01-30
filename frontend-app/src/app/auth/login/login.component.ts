import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

declare const google: any; // Google Identity Services global object

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    this.loadGoogleSignIn();
  }

  loadGoogleSignIn() {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => this.initGoogleSignIn();
    document.head.appendChild(script);
  }

  initGoogleSignIn() {
    // Check if google is available
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '491160602747-ovdftgsvteebotmki95c6r068mfk4op9.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleSignIn(response),
        auto_select: false,
      });

      google.accounts.id.renderButton(
        document.getElementById('googleLoginBtn'),
        { theme: 'outline', size: 'large' }
      );
    } else {
      console.error('Google API not loaded');
    }
  }

  handleGoogleSignIn(response: any) {
    console.log('Google Sign-In success:', response);

    this.authService.loginWithGoogle({ oauthToken: response.credential }).subscribe({
      next: (res: { token: string }) => {
        console.log('User logged in:', res);
        this.authService.storeToken(res.token);
        this.router.navigate(['/']);
      },
      error: (error: any) => console.error('Login failed', error)
    });
  }

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    };

    this.authService.loginWithEmail(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
        alert('Login failed: ' + (error.error?.message || 'Unknown error'));
      },
    });
  }
}
