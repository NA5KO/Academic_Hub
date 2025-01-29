import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from 'src/services/communities.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-top-communities',
  templateUrl: './top-communities.component.html',
  styleUrls: ['./top-communities.component.css']
})
export class TopCommunitiesComponent implements OnInit {
  
  constructor(private communityService: CommunitiesService, private router: Router) {}

  topCommunities: any[] = [];

  getCommunityLink(name: string): string {
    // Replace with the actual URL for your community pages
    return `http://localhost:4200/community/${name}`; 
  }

  ngOnInit(): void {
    this.communityService.getTopCommunities().subscribe((data) => {
      this.topCommunities = data;
    });
  }

  navigateToCommunity(name: string): void {
    this.router.navigate(['/community', name]);  // Navigate with the community name as a parameter
  }
}
