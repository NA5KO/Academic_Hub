import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostItemComponent } from './posts/post-item/post-item.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';



@NgModule({
  declarations: [PostListComponent, PostItemComponent, PostDetailsComponent],
  imports: [CommonModule],
  exports: [PostListComponent]
})
export class PostsModule {}