import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DeviceInfoService } from '../shared/deviceInfo.service';
import { IUser } from '../../../../global';
import { IGoogle } from '../shared/interfaces/google';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
})
export class SignInPage {
  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  constructor(
    private authServiceBack: AuthService,
    private deviceInfoService: DeviceInfoService,
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService
  ) {
    this.signInForm = new FormGroup({});

    this.authRedirectResult = this.authService
      .getRedirectResult()
      .subscribe((result) => {
        if (result.user) {
          const token = result.credential.accessToken;
          const user = this.getProfile(result.user, token);
          this.login(user);
        } else if (result.error) {
          this.submitError = result.error;
        }
      });
  }

  ngOnDestroy() {}

  async login(user: IUser) {
    await this.authServiceBack.login({ user });
    await this.deviceInfoService.setClientDeviceInfo();
    this.ngZone.run(() => {
      this.router.navigate(['profile']);
    });
  }

  async googleSignIn() {
    const result = await this.authService.signInWithGoogle();
    const token = result.credential.accessToken;
    const user = this.getProfile(result.user, token);
    await this.login(user);
  }

  getProfile(user: IGoogle, token: string): IUser {
    return {
      email: user.email,
      name: user.displayName,
      phoneNumber: user.phoneNumber,

      image: user.photoURL,
      idGoogle: user.uid,

      token,
    };
  }
}
