import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostItemComponent } from './posts/post-item/post-item.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { TopCommunitiesComponent } from './communities/top-communities/top-communities.component';
import { CreateCommunityComponent } from './communities/create-community/create-community.component';
import { CommunityDetailsComponent } from './communities/community-details/community-details.component';



@NgModule({
  declarations: [PostListComponent, PostItemComponent, PostDetailsComponent, TopCommunitiesComponent, CreateCommunityComponent, CommunityDetailsComponent],
  imports: [CommonModule],
  exports: [PostListComponent]
})
export class PostsModule {}