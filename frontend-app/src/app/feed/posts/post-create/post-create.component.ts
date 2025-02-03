import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostCreateService, Community } from '../services/create-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: false
})
export class PostCreateComponent implements OnInit {
  // Now communities is explicitly typed as an array of Community objects.
  communities: Community[] = [];

  // The post object stores the community id in the `community` field.
  post = {
    community: '',  // This will hold the community ID
    title: '',
    description: '',
    type: '',  // This will hold the selected PostType (e.g., 'question', 'article', 'news source')
    tags: [] as string[],
    attachment: null,
  };

  tagInput = '';  // Holds the input value for the tag

  constructor(private postCreateService: PostCreateService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchCommunities();
  }
  checkAuthToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Token found:', token);
      return true;
    } else {
      console.log('No token found.');
      return false;
    }
  }

  // Fetch communities from the service
  fetchCommunities() {
    this.postCreateService.fetchCommunities().subscribe(
      (data: Community[]) => {
        // Data is expected to be an array of community objects
        this.communities = data;
      },
      (error) => {
        console.error('Error fetching communities:', error);
        // Fallback static list if needed
        this.communities = [
          { id: 'default-id-1', name: 'Community A' },
          { id: 'default-id-2', name: 'Community B' },
          { id: 'default-id-3', name: 'Community C' },
        ];
      }
    );
  }

  // Submit the form data to create the post
  onSubmit(form: NgForm) {
    if (form.valid) {
      const postData = {
        title: this.post.title,
        content: this.post.description,  // Mapping description to content
        tags: this.post.tags,
        type: this.post.type,  // e.g., 'question', 'article', 'news source'
        communityId: this.post.community,  // The community ID selected in the dropdown
        authorId: this.checkAuthToken() ? this.postCreateService.getAuthorIdFromLocalStorage() : '',  // Use the token check here
        attachment: this.post.attachment ? this.post.attachment : null,
      };

      console.log('Form Data:', postData);

      // Call the service to create the post
      this.postCreateService.createPost(postData).subscribe(
        (response) => {
          console.log('Post created successfully!', response);
          // Show a success popup using MatSnackBar.
          this.snackBar.open('Post created successfully!', 'Close', {
            duration: 3000,
          });
          // Clear the form.
          form.resetForm();
          // Optionally reset the post object if necessary.
          this.resetPost();        },
        (error) => {
          console.error('Error creating post', error);
          alert('An error occurred while creating the post.');
        }
      );
    }
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.post.attachment = file;
  }
   // Clear the post object to reset the form fields.
   resetPost() {
    this.post = {
      community: '',
      title: '',
      description: '',
      type: '',
      tags: [] as string[],
      attachment: null,
    };
    this.tagInput = '';
  }

  // Add tag to the tags array
  addTag() {
    if (this.tagInput.trim()) {
      this.post.tags.push(this.tagInput.trim());
      this.tagInput = '';  // Clear the input field after adding tag
    }
  }

  // Remove tag from the tags array
  removeTag(index: number) {
    this.post.tags.splice(index, 1);  // Remove the tag at the specified index
  }
}
