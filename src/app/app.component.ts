import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./presentation/components/footer/footer.component";
import { NotificationsComponent } from "./presentation/components/notifications/notifications.component";
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthRepositoryImplementation) {}

  ngOnInit(): void {
    const employee = this.authService.getEmployee();
    if (employee) {
      // Reconectar el socket automáticamente si el usuario ya está autenticado
      this.authService.connectSocket(employee.nombre);
    }
  }
}
