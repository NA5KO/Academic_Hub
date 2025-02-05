import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../services/post-edit.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  standalone: false,
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
    profession: '',
  };

  constructor(private profileService: ProfileService) {}

  onSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      // Vérifiez si l'utilisateur est authentifié
      if (!this.profileService.isAuthenticated()) {
        alert('You need to be authenticated to update your profile.');
        return;
      }

      // Appeler le service pour mettre à jour le profil
      this.profileService.updateProfile(this.profile).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          alert('Profile updated successfully!');
          profileForm.resetForm(); // Réinitialiser le formulaire après mise à jour
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('An error occurred while updating the profile.');
        },
      });
    }
  }
}
