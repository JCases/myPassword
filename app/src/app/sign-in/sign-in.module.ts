import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInPage } from './sign-in.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: '', component: SignInPage },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  declarations: [SignInPage],
})
export class SignInPageModule {}
