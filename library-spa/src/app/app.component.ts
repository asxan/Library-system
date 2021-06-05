import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = true;
  constructor(private authService: AuthService) {
  }  
  async ngOnInit(): Promise<void> {
    await this.authService.getMe()
      .finally(()=>this.isLoading = false);
  
  }
}
