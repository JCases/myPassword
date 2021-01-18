import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import firebase from 'firebase/app';
import { ProfileModel } from './profile/profile.model';
import { filter, map, take } from 'rxjs/operators';

import { IUser } from '../../../global';

@Injectable()
export class FirebaseAuthService {
  currentUser: firebase.User;
  redirectResult: Subject<any> = new Subject<any>();

  constructor(
    public angularFireAuth: AngularFireAuth,
    public platform: Platform
  ) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });

    this.angularFireAuth.getRedirectResult().then(
      (result) => {
        if (result.user) {
          this.currentUser = result.user;
          this.redirectResult.next(result);
        }
      },
      (error) => {
        this.redirectResult.next({ error: error.code });
      }
    );
  }

  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }

  public getProfileDataSource() {
    return this.angularFireAuth.user.pipe(
      filter((user: firebase.User) => user != null),
      map((user: firebase.User) => {
        return this.getProfileData();
      }),
      take(1)
    );
  }

  public getProfileData() {
    const user: IUser = {
      email: this.currentUser.providerData[0].email,
      name: this.currentUser.providerData[0].displayName,
      image: this.currentUser.providerData[0].photoURL,
      idGoogle: this.currentUser.providerData[0].uid,
      phoneNumber: this.currentUser.providerData[0].phoneNumber,
    };

    const userModel = new ProfileModel();
    let providerData: any = this.currentUser.providerData[0];

    userModel.image = providerData.photoURL.split('=')[0];
    userModel.name =
      providerData.name || providerData.displayName || "What's your name?";
    userModel.role = 'How would you describe yourself?';
    userModel.description =
      providerData.description ||
      'Anything else you would like to share with the world?';
    userModel.phoneNumber =
      providerData.phoneNumber || 'Is there a number where I can reach you?';
    userModel.email = providerData.email || 'Where can I send you emails?';
    userModel.provider =
      providerData.providerId !== 'password'
        ? providerData.providerId
        : 'Credentials';

    return userModel;
  }

  signOut(): Observable<any> {
    return from(this.angularFireAuth.signOut());
  }

  socialSignIn(scopes?: Array<string>): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();

    if (scopes) {
      scopes.forEach((scope) => {
        provider.addScope(scope);
      });
    }

    if (this.platform.is('desktop')) {
      return this.angularFireAuth.signInWithPopup(provider);
    } else {
      return this.angularFireAuth.signInWithRedirect(provider);
    }
  }

  signInWithGoogle() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const scopes = ['profile', 'email'];
    return this.socialSignIn(scopes);
  }
}
