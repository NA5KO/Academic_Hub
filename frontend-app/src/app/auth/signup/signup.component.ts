import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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
    photo: '' ,
  };

  constructor(private authService: AuthService, private socialAuthService: SocialAuthService, private router: Router) {}

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


  signUpWithGoogle(): void {
  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
    const oauthData = {
    username: userData.name,
    email: userData.email,
    photo: userData.photoUrl,
    provider: userData.provider, // 'google'
    oauthToken: userData.idToken, // Using idToken for authentication
    };

    // Call the backend to process Google sign-up
    this.authService.signUpWithGoogle(oauthData).subscribe({
    next: (response: { token: any; }) => {
      console.log('User signed up:', response);
      this.authService.storeToken(response.token); // Store the JWT token
      this.router.navigate(['/dashboard']); // Redirect to dashboard or home page
    },
    error: (error: any) => {
      console.error('Sign-up failed', error);
      // Display error message
    }
    });
  });
  }

  // // Handle GitHub login
  // signUpWithGitHub(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
  //     const oauthData = {
  //       username: userData.name,
  //       email: userData.email,
  //       photo: userData.photoUrl,
  //       provider: userData.provider, // 'github'
  //       oauthToken: userData.idToken, // Using idToken for authentication
  //     };

  //     // Call the backend to process GitHub sign-up
  //     this.authService.signUpWithGoogle(oauthData).subscribe(
  //       (response: { token: any; }) => {
  //         console.log('User signed up:', response);
  //         this.authService.storeToken(response.token); // Store the JWT token
  //         this.router.navigate(['/dashboard']); // Redirect to dashboard or home page
  //       },
  //       (error: any) => {
  //         console.error('Sign-up failed', error);
  //         // Display error message
  //       }
  //     );
  //   });
  // }

}
