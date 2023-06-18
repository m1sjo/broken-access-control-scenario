import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { LoginPage } from './components/pages/loginPage/loginPage';

const routes: Routes = [
  { path: 'login', component: LoginPage, },
  { path: 'dashboard', component: Dashboard, }, 

  // otherwise redirect to home
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
