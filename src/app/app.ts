import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nav } from './layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  private http = inject(HttpClient);

  title = signal('FrontEnd');

  members = signal<any[]>([]);

  ngOnInit(): void {
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
}

