import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post = {
    user: '',
    avatar: '',
    timePosted: '',
    title: '',
    tags: [] as string[],
    comments: 0,
    upvotes: 0,
    downvotes: 0,
    likes: [] as string[]
  };
}
