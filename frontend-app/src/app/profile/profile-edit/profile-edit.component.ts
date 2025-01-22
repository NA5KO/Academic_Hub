import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  profile = {
    name: '',
    email: '',
    username: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    bio: '',
    degree: '',
    program: '',
    specialization: '',
    technicalSkills: '',
    profession: ''
  };

  onSubmit(profileForm: any): void {
    if (profileForm.valid) {
      console.log('Profile Updated:', this.profile);
      alert('Profile updated successfully!');
      // Optionally, reset the form after submission
      profileForm.resetForm();
    }
  }
}
