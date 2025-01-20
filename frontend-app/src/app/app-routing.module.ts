import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './feed/posts/post-list/post-list.component';
import { PostDetailsComponent } from './feed/posts/post-details/post-details.component';
import { CreateCommunityComponent } from './feed/communities/create-community/create-community.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'community', component: CreateCommunityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}