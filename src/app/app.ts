import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
private http = inject(HttpClient);
  protected readonly title = signal('FrontEnd');
  protected members: signal<any>([]);

  async ngOnInit( {
    this.members.set(await this.getMembers()
    });

}
async get members() {
  try {
    return lastValueFrom (this.http.get('https://localhost:5001/api/members'));
  }catch (error) {
    console.log(error);
    throw error;
  }
  
  }

