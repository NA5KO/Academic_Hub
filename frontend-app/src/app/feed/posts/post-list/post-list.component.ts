import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommunitiesService } from 'src/services/communities.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: false,
})
export class PostListComponent implements OnInit {
  @Input() posts: any[] = [];
  filter: string = '';
  communityName: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private communitiesService: CommunitiesService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes (for community name)
    this.route.params.subscribe((params) => {
      if (params['name']) {
        this.communityName = params['name'];
      } else {
        this.communityName = '';
      }
      this.fetchPosts();
    });

    // Subscribe to query parameter changes (for filter)
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] || '';
      // If no community is specified, use the filter
      if (!this.communityName) {
        this.fetchPosts();
      }
    });
  }

  // Fetch posts based on the context (community, filter, or all)
  fetchPosts(): void {
    if (this.communityName) {
      // Fetch posts related to the specified community
      this.communitiesService.getCommunity(this.communityName).subscribe(
        (data: any) => {
          this.posts = data.posts;
          console.log("Community posts:", this.posts);
        },
        (error) => {
          console.error('Error fetching community posts:', error);
        }
      );
    } else if (this.filter) {
      // Fetch posts based on the provided filter
      this.postService.getPosts(this.filter).subscribe(
        (data: any) => {
          this.posts = data;
          console.log("Filtered posts:", this.posts);
        },
        (error) => {
          console.error('Error fetching filtered posts:', error);
        }
      );
    } else {
      // Fetch all posts (discover mode)
      this.postService.getAllPosts().subscribe(
        (data: any) => {
          this.posts = data;
          console.log("All posts:", this.posts);
        },
        (error) => {
          console.error('Error fetching all posts:', error);
        }
      );
    }
  }
}
