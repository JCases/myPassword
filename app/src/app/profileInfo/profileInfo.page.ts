import { Component } from '@angular/core';

import { ProfileModel } from './../profile/profile.model';

@Component({
  selector: 'profile',
  templateUrl: './profileInfo.page.html',
  styleUrls: ['./profileInfo.page.scss'],
})
export class ProfileInfoPage {
  user: ProfileModel;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
