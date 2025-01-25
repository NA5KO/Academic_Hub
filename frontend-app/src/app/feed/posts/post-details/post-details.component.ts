import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any = {
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
  comments: any[] = [
    { image: '../../../../assets/amine.jpg', author: 'Amine Yahya', text: 'tayerrrrr', time: '30 Minutes ago' },
    { image: '../../../../assets/inesb.jpg', author: 'Ines El Bour', text: '(y)', time: 'Just now' },
  ];
  newComment: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
  }

  addComment(): void {
    if (this.newComment.trim()) {
      const newCommentObj = {
        image: '../../../../assets/amine.jpg', 
        author: 'Current User', // Replace with the logged-in user's name
        text: this.newComment,
        time: 'Just now',
      };
      this.comments.push(newCommentObj); 
      this.newComment = '';
    } else {
      console.log('Comment is empty, cannot add.');
    }
  }
}
