import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from 'src/app/application/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  numeroEmpleado: number = 0;
  empleadoPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogin(){

    this.authService.login(this.numeroEmpleado, this.empleadoPassword).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.log('Error en login:' + err.message)
    });

  }

}
