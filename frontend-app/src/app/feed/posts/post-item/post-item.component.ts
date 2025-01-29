import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() post: any;

  // constructor(private postService: PostService, private router: Router) {}
  constructor(private router: Router) {}

/*
  onUpvote(post: any) {
    this.postService.upvotePost(post.id).subscribe(() => {
      post.upvotes++;
    });
  }

  onDownvote(post: any) {
    this.postService.downvotePost(post.id).subscribe(() => {
      post.downvotes++;
    });
  }

  onSave(post: any) {
    this.postService.savePost(post.id, this.userId).subscribe(() => {
      post.isSaved = !post.isSaved;
    });
  }
}*/
  goToPost(postId: number) {
    this.router.navigate(['/post', postId]);
  }

  goToUserProfile(username: string) {
    this.router.navigate(['/user', username]);
  }

  goToCommunity(community: string) {
    this.router.navigate(['/community', community]);
  }
}
