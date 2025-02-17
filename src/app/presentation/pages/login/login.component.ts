import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '@infrastructure/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';
import { ChatService } from '@infrastructure/services/chat.service';
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
    private router: Router,
    private auth: AuthRepositoryImplementation,
    private socketService: ChatService
  ){}

  onLogin(){

    this.authService.login(this.numeroEmpleado, this.empleadoPassword).subscribe({
      next: () => {
        const username = this.auth.getEmployeeName();
        if(username){
          this.socketService.emit('register', username);
        }
        this.router.navigate(['/dashboard'])
      },
      error: (err) => console.log('Error en login:' + err.message)
    });

  }

}
