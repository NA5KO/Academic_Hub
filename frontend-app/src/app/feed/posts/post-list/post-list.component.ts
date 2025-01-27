import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[] = []; // Stores the filtered posts
  filter: string = ''; 
  userId = 1; // replace with dynamic value

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter']; // Get the filter from the route
      this.fetchFilteredPosts();
    });
  }

  // Fetch posts based on the filter
  fetchFilteredPosts(): void {
    this.posts = this.postService.getPosts(this.filter); // Use PostService
  }
}
