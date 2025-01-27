import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LeftMenuComponent,
    MenuItemComponent,
    TagListComponent,
    CommunityListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule { }
