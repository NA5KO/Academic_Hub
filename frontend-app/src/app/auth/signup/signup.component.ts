import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

declare const google: any; // Google Identity Services global object

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit {
  photoError = '';
  formData = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    bio: '',
    degree: '',
    specialization: '',
    skills: '',
    program: '',
    profession: '',
    photo: '',
  };

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
    google.accounts.id.initialize({
      client_id: '491160602747-ovdftgsvteebotmki95c6r068mfk4op9.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleSignIn(response),
      auto_select: false,
    });
    

    google.accounts.id.renderButton(
      document.getElementById('googleLoginBtn'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleGoogleSignIn(response: any) {
    console.log('Google Sign-In success:', response);
  
    this.authService.signUpWithGoogle({ oauthToken: response.credential }).subscribe({
      next: (res: { token: string }) => {
        console.log('User signed up:', res);
        this.authService.storeToken(res.token);
        this.router.navigate(['/']);
      },
      error: (error: any) => console.error('Sign-up failed', error)
    });
  }
  

  onSubmit() {
    this.authService.signUp(this.formData).subscribe({
      next: (response: any) => {
        console.log('Sign-up successful', response);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Sign-up error', error);
      }
    });
  }
}
