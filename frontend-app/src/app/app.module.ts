import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuModule } from './left-menu/left-menu.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RightMenuModule } from './right-menu/right-menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    LeftMenuModule,
    RightMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
