import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuModule } from './left-menu/left-menu.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RightMenuModule } from './right-menu/right-menu.module';
import { HeaderComponent } from './header/header.component';
import { PostsModule } from './feed/posts.module';
import { ProfileModule } from './profile/profile.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RightMenuModule,
    PostsModule,
    ProfileModule,
    LeftMenuModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
