import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './feed/posts/post-list/post-list.component';
import { PostDetailsComponent } from './feed/posts/post-details/post-details.component';
import { CreateCommunityComponent } from './feed/communities/create-community/create-community.component';
import { TopCommunitiesComponent } from './feed/communities/top-communities/top-communities.component';
import { CommunityDetailsComponent } from './feed/communities/community-details/community-details.component';
import { PostCreateComponent } from './feed/posts/post-create/post-create.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component'
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserPageComponent } from './profile/profile-page/user-page/user-page.component';

// routes ynajem yabda fihom data (header m left w right menu ) si non yabda b default which is true
const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:filter', component: PostListComponent },
  { path: 'post/create', component: PostCreateComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'community', component: CreateCommunityComponent },
  { path: 'communities', component: TopCommunitiesComponent },
  { path: 'community/:name', component: CommunityDetailsComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: { showHeader: false, showLeftMenu: false, showRightMenu: false },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { showHeader: false, showLeftMenu: false, showRightMenu: false },
  },
  { path: 'user/:user', component: UserPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}