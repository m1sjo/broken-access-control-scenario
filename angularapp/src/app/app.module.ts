import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { AppComponent } from './app.component';
import { LoginPage } from './components/pages/loginPage/loginPage';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage
    , Dashboard
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
