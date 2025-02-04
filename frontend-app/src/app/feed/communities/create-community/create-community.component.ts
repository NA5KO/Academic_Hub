import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunitiesService } from 'src/services/communities.service';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css'],
  standalone: false,
})
export class CreateCommunityComponent {
  // The form data for creating a community.
  formData = {
    name: '',
    description: '',
    icon: '',    // Will store Base64 string (or URL if you change the logic)
    banner: '',  // Will store Base64 string (or URL if you change the logic)
    selectedKeywords: [] as string[],
  };

  // Static list of available topics.
  keywords = [
    "Computer Science",
    "Mathematics",
    "Psychology",
    "Business & Management",
    "Engineering",
    "Medicine & Health Sciences",
    "Law",
    "Education",
    "Environmental Science",
    "Economics",
    "History",
    "Philosophy"
  ];

  errorMessage: string = '';

  constructor(
    private communitiesService: CommunitiesService,
    private router: Router
  ) {}

  // Handle file selection for icon or banner.
  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // Create a temporary URL to preview the image
      reader.onload = () => {
        if (type === 'icon') {
          this.formData.icon = URL.createObjectURL(file); // Temporary URL for preview
        } else if (type === 'banner') {
          this.formData.banner = URL.createObjectURL(file); // Temporary URL for preview
        }
      };
      reader.readAsDataURL(file); // This will show the image locally
    }
  }
  
  // Toggle a topic selection (add or remove from selectedKeywords)
  toggleTopic(topic: string) {
    if (this.formData.selectedKeywords.includes(topic)) {
      this.formData.selectedKeywords = this.formData.selectedKeywords.filter(t => t !== topic);
    } else if (this.formData.selectedKeywords.length < 3) {
      this.formData.selectedKeywords.push(topic);
    }
  }

  // Create a new community using the form data.
  createCommunity() {
    // Validate required fields.
    if (!this.formData.name || !this.formData.description || this.formData.selectedKeywords.length === 0) {
      this.errorMessage = "Please fill all required fields and select at least one topic.";
      return;
    }

    // Get the creator ID from local storage via the service.
    const creatorId = this.communitiesService.getAuthorIdFromLocalStorage();
    if (!creatorId) {
      this.errorMessage = "User not authenticated. Please log in.";
      return;
    }

    // Prepare community data to send to the backend.
    const communityData = {
      name: this.formData.name,
      description: this.formData.description,
      banner: this.formData.banner,
      icon: this.formData.icon,
      keywords: this.formData.selectedKeywords,  // Rename selectedKeywords to keywords
      creatorId: creatorId,  // Use the current user's id as creatorId
      followersCount: 0  // Optional, default value
    };

    console.log('Community Data:', communityData);

    // Call the service to create the community.
    this.communitiesService.createCommunity(communityData).subscribe(
      response => {
        this.router.navigate(['/create-community/', response.name]); // Navigate to community page
      },
      error => {
        console.error('Error creating community:', error);
        this.errorMessage = "Error creating community. Please try again.";
      }
    );
  }
}
