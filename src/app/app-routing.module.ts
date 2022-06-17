import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './pages/auth/create-account/create-account.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AddNewComponent } from './pages/dashboard/add-new/add-new.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { MainComponent } from './pages/dashboard/main/main.component';

const routes: Routes = [
  
  {path: 'create-account', component: CreateAccountComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path:'dashboard', component: MainComponent, children:[
    {path:'add', component:  AddNewComponent},
    {path: '', component:HomeComponent },
  ]},
  {path: '', component: LoginComponent},
  {path:'**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
