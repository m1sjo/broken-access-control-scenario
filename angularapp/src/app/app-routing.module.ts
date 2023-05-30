import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Dashboard } from './components/pages/dashboard/dashboard';
import { LoginPage } from './app.component';

//const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: LoginPage, }, // canActivate: [AuthGuard]
  //{ path: 'users', loadChildren: usersModule, }, // canActivate: [AuthGuard] 
  { path: 'dashboard', component: Dashboard, pathMatch: "full"}, //loadChildren: accountModule 

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
