import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseAuthService } from '../firebase.service';

@Injectable()
export class MainPageResolver implements Resolve<any> {
  constructor(private firebaseAuthService: FirebaseAuthService) {}

  resolve() {
    return this.firebaseAuthService.getProfileDataSource();
  }
}
