import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css'],
  standalone: false
})
export class CommunityListComponent {
  @Input() communities!: { name: string; count: number }[];
}