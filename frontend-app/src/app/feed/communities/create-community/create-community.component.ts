import { Component } from '@angular/core';
import { CommunitiesService } from 'src/services/communities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent {
  
  formData = {
    name: '',
    description: '',
    icon: '', // Will store Base64 string
    banner: '', // Will store Base64 string
    selectedKeywords: [] as string[]
  };

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

  constructor(private communitiesService: CommunitiesService, private router: Router) {}

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'icon') {
          this.formData.icon = reader.result as string;
        } else if (type === 'banner') {
          this.formData.banner = reader.result as string;
        }
      };
      reader.readAsDataURL(file); // Convert file to Base64 string
    }
  }

  toggleTopic(topic: string) {
    if (this.formData.selectedKeywords.includes(topic)) {
      this.formData.selectedKeywords = this.formData.selectedKeywords.filter(t => t !== topic);
    } else if (this.formData.selectedKeywords.length < 3) {
      this.formData.selectedKeywords.push(topic);
    }
  }

  createCommunity() {
    if (!this.formData.name || !this.formData.description || this.formData.selectedKeywords.length === 0) {
      this.errorMessage = "Please fill all required fields and select at least one topic.";
      return;
    }

    this.communitiesService.createCommunity(this.formData).subscribe(
      response => {
        this.router.navigate(['/community/', response.name]); // Navigate to community page
      },
      error => {
        console.error('Error creating community:', error);
        this.errorMessage = "Error creating community. Please try again.";
      }
    );
  }
}
