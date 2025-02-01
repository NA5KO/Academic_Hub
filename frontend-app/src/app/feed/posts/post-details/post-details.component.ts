import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any;
  userId: string = ''; // logged in user id
  commentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.fetchPost(postId);
      }
    });
  }

  fetchPost(postId: string): void {
    this.postService.getPostById(postId).subscribe(
      (data) => {
        console.log(data)
        this.post = data;
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }

  addComment(): void {
    if (!this.commentText.trim()) return;
    this.postService.commentPost(this.post.id, this.userId, this.commentText).subscribe(
      (response) => {
        this.post.comments.push(response);
        this.commentText = '';
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }
}
