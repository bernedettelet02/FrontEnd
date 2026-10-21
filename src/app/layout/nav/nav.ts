
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../Core/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {};
  protected loggedIn = this.accountService.loggedIn;
  protected userEmail = this.accountService.userEmail;


  login(): void {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        // Update the UI only after the real API login succeeds.
        this.accountService.setLoggedIn(this.creds.email);
      },
      error: error => {
        console.error('Login failed:', error);
        alert('Login failed. Check your credentials and try again.');
      },
    });
  }

  logout(): void {
    this.accountService.logout();
    this.creds = {};
  }
}
