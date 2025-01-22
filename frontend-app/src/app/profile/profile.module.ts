import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileEditComponent,
  ],
  imports: [
    CommonModule,FormsModule
  ],
  exports: []
})
export class ProfileModule { }
