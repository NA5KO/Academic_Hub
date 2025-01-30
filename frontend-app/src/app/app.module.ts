import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuModule } from './left-menu/left-menu.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RightMenuModule } from './right-menu/right-menu.module';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserProfileComponent,
    UserPageComponent,
    CommentComponent,
    CommentsComponent,
    PostComponent,
    PostsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    LeftMenuModule,
    RightMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
