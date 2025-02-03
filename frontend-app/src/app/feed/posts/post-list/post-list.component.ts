import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: false,
})
export class PostListComponent implements OnInit {
  @Input() posts: any[] = [];
  filter: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] || '';  // Get the filter from the route (empty string if undefined)
      this.fetchPosts();  // Fetch posts based on the filter
    });
  }

  // Fetch posts based on the filter
  fetchPosts(): void {
    if (this.filter) {
      // If there's a filter, use the filtered fetch method
      this.postService.getPosts(this.filter).subscribe(
        (data: any) => {
          console.log(data);
          this.posts = data;  // Update posts with the filtered data
        },
        (error) => {
          console.error('Error fetching filtered posts:', error);
        }
      );
    } else {
      // If no filter, fetch all posts
      this.postService.getAllPosts().subscribe(
        (data: any) => {
          console.log(data);
          this.posts = data;  // Update posts with all data
        },
        (error) => {
          console.error('Error fetching all posts:', error);
        }
      );
    }
  }
}
