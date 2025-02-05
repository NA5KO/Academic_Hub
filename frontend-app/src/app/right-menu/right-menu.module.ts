import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedCommunitiesComponent } from './components/related-communities/related-communities.component';
import { TopContributorsComponent } from './components/top-contributors/top-contributors.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';



@NgModule({
  declarations: [
    RelatedCommunitiesComponent,
    TopContributorsComponent,
    RightMenuComponent
  ],
  imports: [
    CommonModule
  ],
    exports: [RightMenuComponent]
})
export class RightMenuModule { }
