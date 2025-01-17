import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-related-communities',
  templateUrl: './related-communities.component.html',
  styleUrls: ['./related-communities.component.css'],
  standalone: false
})
export class RelatedCommunitiesComponent {
  @Input() communities: { name: string }[] = [];
}
