import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FirebaseAuthService } from '../firebase.service';
import { AuthService } from '../auth/auth.service';

import { ProfileModel } from './profile.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: ProfileModel;

  constructor(
    private authServiceBack: AuthService,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService,
    private router: Router
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

  profile() {
    this.router.navigate(['/profile']);
  }

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
