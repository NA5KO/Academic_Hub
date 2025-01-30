import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/create-post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  // Liste des communautés(hedhi suppose tekhou list ml communities list !)
  communities = ['Technology', 'Science', 'Art', 'Programming', 'Gaming'];

  // Objet pour les données du formulaire
  post = {
    community: '',
    title: '',
    description: '',
    attachment: null,
  };

  constructor(private postService: PostService) {}

  // Gestion de la sélection de fichier
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.post.attachment = file;
    }
  }

  // Gestion de la soumission du formulaire
  onSubmit(postForm: NgForm): void {
    if (postForm.valid) {
      // Vérifiez l'authentification
      if (!this.postService.isAuthenticated()) {
        alert('You need to be authenticated to create a post.');
        return;
      }

      // Préparer les données à envoyer
      const postDto = {
        community: this.post.community,
        title: this.post.title,
        description: this.post.description,
        attachment: this.post.attachment,
      };

      // Appeler le service pour envoyer les données
      this.postService.createPost(postDto).subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
          alert('Post created successfully!');
          postForm.resetForm(); // Réinitialiser le formulaire
        },
        error: (err) => {
          console.error('Error creating post:', err);
          alert('An error occurred while creating the post.');
        },
      });
    }
  }
}
