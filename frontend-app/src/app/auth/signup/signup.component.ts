import { Component } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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


  };
  onSubmit() {
    alert('Sign-Up form submitted successfully!');
  }
}
