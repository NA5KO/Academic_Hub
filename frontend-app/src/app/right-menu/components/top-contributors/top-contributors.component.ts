import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-contributors',
  templateUrl: './top-contributors.component.html',
  styleUrls: ['./top-contributors.component.css'],
  standalone: false
})
export class TopContributorsComponent {
  @Input() contributors: { name: string, count: number }[] = [];
}
