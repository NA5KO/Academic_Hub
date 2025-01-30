import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './profile-page/user-profile/user-profile.component';
import { CommentComponent } from './profile-page/comment/comment.component';
import { CommentsComponent } from './profile-page/comments/comments.component';
import { UserPageComponent } from './profile-page/user-page/user-page.component';
import { LeftMenuModule } from "../left-menu/left-menu.module";
import { RightMenuModule } from "../right-menu/right-menu.module";

@NgModule({
  declarations: [
    ProfileEditComponent,
    UserProfileComponent,
    CommentComponent,
    CommentsComponent,
    UserPageComponent,
  ],
  imports: [
    CommonModule, FormsModule,
    LeftMenuModule,
    RightMenuModule
],
  exports: []
})
export class ProfileModule { }
