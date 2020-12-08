// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { Observable, Subject, from } from 'rxjs';
// import { Platform } from '@ionic/angular';
// import firebase from 'firebase/app';
// import { filter, map, take } from 'rxjs/operators';

// @Injectable()
// export class FirebaseAuthService {
//   currentUser: firebase.User;
//   userProviderAdditionalInfo: any;
//   redirectResult: Subject<any> = new Subject<any>();

//   constructor(
//     public angularFireAuth: AngularFireAuth,
//     public platform: Platform
//   ) {
//     this.angularFireAuth.onAuthStateChanged((user) => {
//       if (user) {
//         this.currentUser = user;
//       } else {
//         this.currentUser = null;
//       }
//     });

//     // when using signInWithRedirect, this listens for the redirect results
//     this.angularFireAuth.getRedirectResult().then(
//       (result) => {
//         // FIXME: result.credential.accessToken gives you the Provider Access Token. You can use it to access the Provider API.
//         if (result.user) {
//           this.setProviderAdditionalInfo(result.additionalUserInfo.profile);
//           this.currentUser = result.user;
//           this.redirectResult.next(result);
//         }
//       },
//       (error) => {
//         this.redirectResult.next({ error: error.code });
//       }
//     );
//   }

//   getRedirectResult(): Observable<any> {
//     return this.redirectResult.asObservable();
//   }

//   setProviderAdditionalInfo(additionalInfo: any) {
//     this.userProviderAdditionalInfo = { ...additionalInfo };
//   }

//   public getProfileDataSource() {
//     return this.angularFireAuth.user.pipe(
//       filter((user: firebase.User) => user != null),
//       map((user: firebase.User) => {
//         return this.getProfileData();
//       }),
//       take(1) // FIXME: this.angularFireAuth.user never completes so we use take(1) in order to complete after the first value is emitted
//     );
//   }

//   public getProfileData() {
//     const userModel = new ProfileModel();
//     let providerData: any = this.currentUser.providerData[0];

//     if (this.userProviderAdditionalInfo) {
//       providerData = { ...providerData, ...this.userProviderAdditionalInfo };
//     }

//     // TODO: Default imgs are too small and our app needs a bigger image
//     switch (providerData.providerId) {
//       case 'google.com':
//         userModel.image = providerData.photoURL.split('=')[0];
//         break;
//       default:
//         userModel.image = providerData.photoURL;
//     }
//     userModel.name =
//       providerData.name || providerData.displayName || "What's your name?";
//     userModel.role = 'How would you describe yourself?';
//     userModel.phoneNumber =
//       providerData.phoneNumber || 'Is there a number where I can reach you?';
//     userModel.email = providerData.email || 'Where can I send you emails?';

//     return userModel;
//   }

//   signOut(): Observable<any> {
//     return from(this.angularFireAuth.signOut());
//   }

//   socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
//     const provider = new firebase.auth.OAuthProvider(providerName);

//     // FIXME: Add any permission scope you need
//     if (scopes) {
//       scopes.forEach((scope) => {
//         provider.addScope(scope);
//       });
//     }

//     if (this.platform.is('desktop')) {
//       return this.angularFireAuth.signInWithPopup(provider);
//     } else {
//       return this.angularFireAuth.signInWithRedirect(provider);
//     }
//   }

//   signInWithGoogle() {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const scopes = ['profile', 'email'];
//     return this.socialSignIn(provider.providerId, scopes);
//   }
// }
