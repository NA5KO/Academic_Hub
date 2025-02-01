import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'src/services/communities.service';


@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  communityName: string = '';
  posts: any[] = [];  // Array to hold the posts
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private communitiesService: CommunitiesService
  ) { }

  ngOnInit(): void {
    // Retrieve the community name from the URL parameters
    this.communityName = this.route.snapshot.paramMap.get('name')!;
    this.getCommunityPosts();
  }

  // Fetch posts related to the community
  getCommunityPosts(): void {
    this.communitiesService.getPostsByCommunity(this.communityName).subscribe(
      (response) => {
        this.posts = response;  // Store the posts in the posts array
        this.isLoading = false;  // Set loading to false once posts are loaded
      },
      (error) => {
        this.error = 'Error fetching posts';  // Handle error if there is any
        this.isLoading = false;
        console.error('Error fetching posts:', error);
      }
    );
  }
}
