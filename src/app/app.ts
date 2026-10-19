import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Nav } from './layout/nav/nav';
import { AccountService } from '../Core/account-service';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);

  title = signal('FrontEnd');
  members = signal<any[]>([]);

  ngOnInit(): void {
    this.setCurrentUser();

    this.http.get<any[]>('https://localhost:5001/api/members').subscribe({
      next: response => {
        console.log(response);
        this.members.set(response);
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('HTTP request completed');
      }
    });
  }
  async getMembers() {
   try{
    return this.http.get<any[]>('https://localhost:5001/api/members');
   } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
   }
 
  }

  setCurrentUser(): void {
    const userString = localStorage.getItem('User');

    if (!userString) {
      return;
    }

    try {
      const user = JSON.parse(userString);
      this.accountService.currentUser.set(user);
    } catch (error) {
      console.error('Could not restore saved user:', error);
      localStorage.removeItem('User');
    }
  }
}

 
