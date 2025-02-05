import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  standalone: false,
})
export class PostItemComponent implements OnInit {

  constructor(private postService: PostService, private router: Router, private authService: AuthService) {}

  @Input() post: any;
  userId: string = this.authService.checkAuthToken() ? this.authService.getUserIdFromLocalStorage() : ''; 

  isSaved: boolean = false;
  isUpvoted: boolean = false;
  isDownvoted: boolean = false;

  ngOnInit(): void {
    // console.log(this.post);
  }
  

  // Handle upvoting/downvoting logic
  handleVote(voteType: 'upvote' | 'downvote'): void {
    if (voteType === 'upvote') {
      if (this.isUpvoted) {
        // Unupvote if already upvoted
        this.postService.unupvotePost(this.post.id).subscribe(() => {
          this.post.upvotes -= 1;
          this.isUpvoted = false;
        });
      } else {
        // Upvote the post
        this.postService.upvotePost(this.post.id).subscribe(() => {
          this.post.upvotes += 1;
          this.isUpvoted = true;

          // If already downvoted, remove downvote
          if (this.isDownvoted) {
            this.post.downvotes -= 1;
            this.isDownvoted = false;
          }
        });
      }
    } else if (voteType === 'downvote') {
      if (this.isDownvoted) {
        // Undownvote if already downvoted
        this.postService.undownvotePost(this.post.id).subscribe(() => {
          this.post.downvotes -= 1;
          this.isDownvoted = false;
        });
      } else {
        // Downvote the post
        this.postService.downvotePost(this.post.id).subscribe(() => {
          this.post.downvotes += 1;
          this.isDownvoted = true;

          // If already upvoted, remove upvote
          if (this.isUpvoted) {
            this.post.upvotes -= 1;
            this.isUpvoted = false;
          }
        });
      }
    }
  }

  // Handle save/unsave logic
  handleSave(): void {
    if (this.isSaved) {
      this.postService.unsavePost(this.post.id).subscribe(() => {
        this.post.saves -= 1;
        this.isSaved = false;
      });
    } else {
      this.postService.savePost(this.post.id).subscribe(() => {
        this.post.saves += 1;
        this.isSaved = true;
      });
    }
  }

  goToPost(postId: number): void {
    this.router.navigate(['/id', postId]);
  }

  goToUserProfile(username: string): void {
    this.router.navigate(['/user', username]);
  }

  goToCommunity(community: string): void {
    this.router.navigate(['/community', community]);
  }
}
