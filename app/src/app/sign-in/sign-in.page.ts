import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase.service';
import { Subscription } from 'rxjs';

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
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService
  ) {
    this.signInForm = new FormGroup({});

    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService
      .getRedirectResult()
      .subscribe((result) => {
        if (result.user) {
          this.redirectLoggedUserToProfilePage();
        } else if (result.error) {
          this.submitError = result.error;
        }
      });
  }

  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['profile']);
    });
  }

  googleSignIn() {
    this.authService
      .signInWithGoogle()
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
