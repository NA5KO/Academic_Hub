import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostItemComponent } from './posts/post-item/post-item.component';



@NgModule({
  declarations: [PostListComponent, PostItemComponent],
  imports: [CommonModule],
  exports: [PostListComponent]
})
export class PostsModule {}