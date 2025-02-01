import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: any;
  @Input() userId: string = ''; // User ID of the logged-in user
  
  // hedhom yaamlou machekel , yetsal7o kif ywali aana authguard
  isSaved: boolean = false; 
  isUpvoted: boolean = false; 
  isDownvoted: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    // Initialize post states (upvoted, downvoted, saved) based on user status.
    this.checkUserPostStatus();
  }

  // General method to update votes and saves
  private updatePostState(action: 'upvote' | 'downvote' | 'save', increment: boolean): void {
    const actionMap = {
      upvote: () => increment ? this.post.upvotes += 1 : this.post.upvotes -= 1,
      downvote: () => increment ? this.post.downvotes += 1 : this.post.downvotes -= 1,
      save: () => increment ? this.post.saves += 1 : this.post.saves -= 1
    };

    actionMap[action]();

    // Toggle the state based on the action
    if (action === 'upvote') {
      this.isUpvoted = increment;
    } else if (action === 'downvote') {
      this.isDownvoted = increment;
    } else if (action === 'save') {
      this.isSaved = increment;
    }
  }

  // Generalized upvote and downvote logic
  handleVote(action: 'upvote' | 'downvote', increment: boolean): void {
    const voteServiceMethod = action === 'upvote' ? this.postService.upvotePost(this.post.id) : this.postService.downvotePost(this.post.id);

    voteServiceMethod.subscribe(() => {
      this.updatePostState(action, increment);
    }, error => {
      console.error(`Error ${action} post:`, error);
    });
  }

  // Generalized save and unsave logic
  handleSavePost(increment: boolean): void {
    this.postService.savePost(this.post.id, this.userId).subscribe(() => {
      this.updatePostState('save', increment);
    }, error => {
      console.error(`Error saving post:`, error);
    });
  }

  // Initialize post states on load
  checkUserPostStatus(): void {
    // You may want to add logic to check the current user's post state, e.g., whether the user has already upvoted, downvoted, or saved the post
  }

  goToPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }

  goToUserProfile(username: string): void {
    this.router.navigate(['/user', username]);
  }

  goToCommunity(community: string): void {
    this.router.navigate(['/community', community]);
  }
}
