import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() post: any;

  constructor(private router: Router) {}

  goToPostDetails(postId: number): void {
    this.router.navigate(['/post', postId]);
  }
}
