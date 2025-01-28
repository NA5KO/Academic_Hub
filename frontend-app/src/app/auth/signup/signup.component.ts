import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

declare var gapi: any; // Declare the Google API global object

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialize the Google API client
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
      });

      // Attach click handler to the sign-up button
      auth2.attachClickHandler(
        document.getElementById('googleLoginBtn'), // Your login button element
        {},
        (googleUser: any) => {
          // Extract user data from the googleUser object
          const oauthData = {
            username: googleUser.getBasicProfile().getName(),
            email: googleUser.getBasicProfile().getEmail(),
            photo: googleUser.getBasicProfile().getImageUrl(),
            provider: 'google', // Provider name
            oauthToken: googleUser.getAuthResponse().id_token, // OAuth token
          };

          // Send oauthData to your backend API for processing
          this.signUpWithGoogle(oauthData);
        },
        (error: any) => {
          console.error('Google sign-in error', error);
        }
      );
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


  // Handle Google sign-up directly using HTTP
  signUpWithGoogle(oauthData: any): void {
    // Call the backend to process Google sign-up
    this.authService.signUpWithGoogle(oauthData).subscribe({
      next: (response: { token: any }) => {
        console.log('User signed up:', response);
        this.authService.storeToken(response.token); // Store the JWT token
        this.router.navigate(['/']); // Redirect to dashboard or home page
      },
      error: (error: any) => {
        console.error('Sign-up failed', error);
        // Display error message
      }
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
