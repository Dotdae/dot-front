import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRepository } from '@domain/repositories/auth/auth.repository';
import { Router } from '@angular/router';
import { Employee } from '@domain/models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class AuthRepositoryImplementation implements AuthRepository {

  private apiUrl = 'http://localhost:4000/api';
  private employeeKey = 'empleado';

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  login(numeroEmpleado: number, empleadoPassword: string): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/login`, {numeroEmpleado, empleadoPassword}, {
      withCredentials: true,              // With credentials is for include the cookies.
    })
    /*
    return this.http.post<Employee>(`${this.apiUrl}/login`, { numeroEmpleado, empleadoPassword }).pipe(
      tap(employee => {
        localStorage.setItem(this.employeeKey, JSON.stringify(employee));
      })
    )
    */
  }

  logout(): void {

    this.http.post<void>(`${this.apiUrl}/logout`, null, { withCredentials: true}).subscribe({
      next: () => {
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
