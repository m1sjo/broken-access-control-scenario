import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { LoginPage } from './components/pages/loginPage/loginPage';

@NgModule({
  declarations: [
    AppComponent
    , LoginPage
    , Dashboard
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
    , LoginPage
    , Dashboard]
})
export class AppModule { }
