import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  standalone: false,
})
export class CommentComponent {
  @Input() comment!: { title: string; text: string };
}