import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LeftMenuComponent,
    CommunityListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule { }
