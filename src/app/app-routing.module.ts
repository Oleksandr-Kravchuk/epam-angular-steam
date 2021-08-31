import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { AccountComponent } from './Components/account/account.component';
import { FriendsComponent } from './Components/friends/friends.component';
import { GamesComponent } from './Components/games/games.component';
import { LibraryComponent } from './Components/library/library.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/games', pathMatch: 'full' },
      { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
      { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
      { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', component: AccountComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
