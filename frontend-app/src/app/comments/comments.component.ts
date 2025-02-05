import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  comments = [
    { title: 'The title will be in this section! Post title!', text: 'The comments made will be included here. So the comment will appear here.' },
    { title: 'Another title! Post title!', text: 'Another comment text here. The comment will appear here.' },
    { title: 'Yet another title! Post title!', text: 'Yet another comment text. The comment will appear here.' }
  ];
}
