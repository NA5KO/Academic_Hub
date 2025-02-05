import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'src/services/communities.service';
import { FeedService } from 'src/services/feed.service';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css'],
  standalone: false
})
export class RightMenuComponent {
  relatedCommunities: any[] = [];
  communityId: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private feedService: FeedService,
    private communityService: CommunitiesService
  ) {}

  ngOnInit(): void {
    // Extract community name from route
    const communityName = this.route.snapshot.url[1]?.path; 
    
    if (communityName) {
      // Fetch community details by name to get the ID
      this.communityService.getCommunityByName(communityName).subscribe((community) => {
        this.communityId = community.id; // Get the ID
        console.log("hedha communityid"+this.communityId)
        // Fetch related communities using the retrieved ID
        this.feedService.getRelatedCommunities(this.communityId).subscribe((data) => {
          console.log("hedhi related community "+data)
          this.relatedCommunities = data;
        });
      });
    }
  }
}