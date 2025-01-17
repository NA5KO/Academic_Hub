import { Component } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css'],
  standalone: false
})
export class RightMenuComponent {
  relatedCommunities = [
    { name: 'Kubernetes' },
    { name: 'MLOps' },
    { name: 'DevOps' },
  ];
  topContributors = [
    { name: 'Özellik İsteği', count: 100 },
    { name: 'Değişiklikler', count: 99 },
  ];
}
