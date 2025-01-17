import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  standalone: false
})
export class TagListComponent {
  @Input() tags!: { name: string; count: number }[];
}
