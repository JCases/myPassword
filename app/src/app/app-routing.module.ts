import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLogged } from './shared/guard/logged.guard';
import { NotLogged } from './shared/guard/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsLogged],
    loadChildren: () =>
      import('./main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'auth',
    canActivate: [NotLogged],
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
