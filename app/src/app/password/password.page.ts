import { Component } from '@angular/core';

@Component({
  selector: 'password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {
  constructor() {}

  refreshPasswords(event) {
    setTimeout(() => {
      event.complete();
    }, 2000);
  }

  reorderPasswords(event) {
    event.disabled = !event.disabled;
  }
}
