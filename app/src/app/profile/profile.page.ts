import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseAuthService } from '../firebase.service';
import { AuthService } from '../auth/auth.service';

import { ProfileModel } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: ProfileModel;

  constructor(
    private authServiceBack: AuthService,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (result) => {
        this.user = result['data'];
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      (err) => {}
    );
  }

  ngOnDestroy() {}

  signOut() {
    this.authService.signOut().subscribe(
      () => {
        this.authServiceBack.logout();
      },
      (error) => {
        console.log('signout error', error);
      }
    );
  }
}
