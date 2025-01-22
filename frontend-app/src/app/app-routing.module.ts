import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './feed/posts/post-list/post-list.component';
import { PostDetailsComponent } from './feed/posts/post-details/post-details.component';
import { CreateCommunityComponent } from './feed/communities/create-community/create-community.component';
import { TopCommunitiesComponent } from './feed/communities/top-communities/top-communities.component';
import { CommunityDetailsComponent } from './feed/communities/community-details/community-details.component';
import { PostCreateComponent } from './feed/posts/post-create/post-create.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component'
const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/create', component: PostCreateComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'community', component: CreateCommunityComponent },
  { path: 'communities', component: TopCommunitiesComponent },
  { path: 'community/:name', component: CommunityDetailsComponent },
  { path: 'profile/edit', component: ProfileEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}