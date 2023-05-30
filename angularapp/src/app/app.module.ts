import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
//import { Dashboard } from './app.component';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { LoginPage } from './app.component';

@NgModule({
  declarations: [
    LoginPage
    , Dashboard
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    LoginPage
    //Dashboard
    ]
})
export class AppModule { }
