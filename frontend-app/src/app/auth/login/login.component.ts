import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please fill in both email and password.');
      return;
    }
    console.log('Form Submitted', { email: this.email, password: this.password, rememberMe: this.rememberMe });
  }
}