import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: 'help.page.html',
  styleUrls: ['help.page.scss'],
})
export class HelpPage {
  constructor(public router: Router) {}

  ngOnDestroy() {}

  signIn() {
    this.router.navigate(['/auth']);
  }
}
