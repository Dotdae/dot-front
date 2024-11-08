import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/application/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthService){}

  logout(){
    this.authService.logout();
  }

}
