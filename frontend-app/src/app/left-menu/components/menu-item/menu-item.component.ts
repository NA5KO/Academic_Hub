import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  standalone: false
})
export class MenuItemComponent {
  @Input() icon!: string;
  @Input() label!: string;
}
