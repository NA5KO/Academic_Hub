import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig ,SocialLoginModule  } from 'angularx-social-login';

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
    LeftMenuModule,
    RightMenuModule,
    PostsModule,
    ProfileModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('491160602747-ovdftgsvteebotmki95c6r068mfk4op9.apps.googleusercontent.com')
          },
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
