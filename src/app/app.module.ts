import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateAccountComponent } from './pages/auth/create-account/create-account.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { MainComponent } from './pages/dashboard/main/main.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { AddNewComponent } from './pages/dashboard/add-new/add-new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    MainComponent,
    HomeComponent,
    AddNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
