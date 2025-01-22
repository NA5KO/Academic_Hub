import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  

})
export class PostCreateComponent {
  post = {
    title: '',
    description: '',
    attachment: null
  };

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.post.attachment = file;
    }
  }

  onSubmit(postForm: any): void {
    if (postForm.valid) {
      console.log('Post created:', this.post);
      alert('Post created successfully!');
      // Reset form after submission
      postForm.resetForm();
    }
  }
}
