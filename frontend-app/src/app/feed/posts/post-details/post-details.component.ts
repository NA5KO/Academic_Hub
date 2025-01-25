import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any = {};
  comments: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.fetchPostDetails(postId);
    this.fetchComments(postId);
  }

  fetchPostDetails(postId: string | null): void {
    this.post = {
      id: 1,
      image: '../../../../assets/nourhen.jpg',
      author: 'Figma/Nourhen Khechine',
      time: '3 minutes ago',
      content: 'How Do I Solve This Problem on Figma?',
      tags: ['#Figma'],
      comments: 3,
      upvotes: 48,
      downvotes: 0,
      isSaved: false,
    };
  }

  fetchComments(postId: string | null): void {
    this.comments = [
      { image: '../../../../assets/amine.jpg', author: 'Amine Yahya', text: 'tayerrrrr', time: '30 Minutes ago' },
      { image: '../../../../assets/inesb.jpg', author: 'Ines El Bour', text: '(y)', time: 'Just now' },
    ];
  }

  addComment(): void {
    console.log('Comment added!');
  }
}
