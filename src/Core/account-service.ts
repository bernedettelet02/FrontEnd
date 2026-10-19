import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../type/user';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
currentUser = signal<User | null>(null);
isAuthenticated = computed(() => this.loggedIn());

  baseUrl = 'https://localhost:5001/api/';

  loggedIn = signal(
    localStorage.getItem('orantiumLoggedIn') === 'true'
  );

  userEmail = signal(
    localStorage.getItem('orantiumUserEmail') || ''
  );

 login(creds: any) {
  return this.http.post<User>(
    this.baseUrl + 'account/login',
    creds
  ).pipe(
    tap(user => {
      if (user) {
        this.currentUser.set(user);
      }
    })
  );
}
  setLoggedIn(email: string) {
    this.userEmail.set(email);
    this.loggedIn.set(true);

    localStorage.setItem('orantiumUserEmail', email);
    localStorage.setItem('orantiumLoggedIn', 'true');
  }

  logout() {
  this.currentUser.set(null);
  this.loggedIn.set(false);
  this.userEmail.set('');

  localStorage.removeItem('orantiumUserEmail');
  localStorage.removeItem('orantiumLoggedIn');
  localStorage.removeItem('User');
}
}