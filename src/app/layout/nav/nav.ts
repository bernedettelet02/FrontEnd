

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private accountService = inject(AccountService);
  protected creds: any = {};
  protected loggedIn = signal(false);



  login() {
     console.log('Login button clicked');
  console.log('Credentials:', this.creds);

    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log('Login response:', result);
        this.loggedIn.set(true);
      },
      error: error => {
        console.error('Login failed:', error);
        alert('Login failed. Check the browser console.');
      },
    });
  }

  logout() {
    this.loggedIn.set(false);
  }
  testLogin() {
  this.creds.email = 'demo@orantium.com';
  this.loggedIn.set(true);
}
}
