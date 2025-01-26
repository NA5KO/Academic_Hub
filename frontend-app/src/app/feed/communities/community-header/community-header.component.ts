import { Component } from '@angular/core';

@Component({
  selector: 'app-community-header',
  templateUrl: './community-header.component.html',
  styleUrls: ['./community-header.component.css']
})
export class CommunityHeaderComponent {

  communityName: string = 'Ac/RT4';
  communityDescription: string = 'This is the community description.';

  editCommunity() {
    
    console.log('Edit Community button clicked');
  }
}