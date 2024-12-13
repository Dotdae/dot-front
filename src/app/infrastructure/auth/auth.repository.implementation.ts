import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRepository } from '@domain/repositories/auth/auth.repository';
import { Router } from '@angular/router';
import { Employee } from '@domain/models/employee.model';
import { ChatService } from '@infrastructure/services/chat.service';

@Injectable({
  providedIn: 'root'
})

export class AuthRepositoryImplementation implements AuthRepository {

  private apiUrl = 'http://localhost:4000/api';
  private employeeKey = 'empleado';

  constructor(
    private http: HttpClient,
    private router: Router,
    private chatService: ChatService
  ){}

  login(numeroEmpleado: number, empleadoPassword: string): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/login`, {numeroEmpleado, empleadoPassword}, {
      withCredentials: true,              // With credentials is for include the cookies.
    }).pipe(
      tap( employee => {
        localStorage.setItem(this.employeeKey, JSON.stringify(employee));

        this.chatService.connect(employee.nombre);
      })

    )
  }

  // Reconectar socket
  connectSocket(userName: string): void {
    this.chatService.connect(userName);
  }

  logout(): void {

    this.http.post<void>(`${this.apiUrl}/logout`, null, { withCredentials: true}).subscribe({
      next: () => {
        localStorage.removeItem(this.employeeKey); // Cambia según el nombre de tu clave
        sessionStorage.clear(); // Limpia todo lo almacenado en sessionStorage
        // Desconectar el socket
        this.chatService.disconnect();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  isAuthenticated(): void {

  }

  getEmployee(): Employee | null {
    const user = localStorage.getItem(this.employeeKey);
    return user ? JSON.parse(user) : null;
  }

  getEmployeeName(): string {
    const employee = this.getEmployee();
    return employee ? employee.nombre : 'Desconocido';
  }

  getEmployeeRole(): string {
    const employee = this.getEmployee();
    return employee ? employee.rol : 'Empleado';
  }

}
