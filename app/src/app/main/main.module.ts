import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { MainPageResolver } from './main.resolver';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      data: MainPageResolver,
    },
    children: [
      {
        path: 'create-password',
        loadChildren: () =>
          import('../create-password/create.module').then(
            (m) => m.CreatePageModule
          ),
      },
      {
        path: 'password',
        loadChildren: () =>
          import('../password/password.module').then(
            (m) => m.PasswordPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profileInfo/profileInfo.module').then(
            (m) => m.ProfileInfoPageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/password',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MainPage],
  providers: [MainPageResolver],
})
export class MainPageModule {}
