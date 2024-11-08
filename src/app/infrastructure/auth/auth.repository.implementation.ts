import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRepository } from '@domain/repositories/auth/auth.repository';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthRepositoryImplementation implements AuthRepository {

  private apiUrl = 'http://localhost:4000/api';
  private employeeKey = 'empleado';
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  login(numeroEmpleado: number, empleadoPassword: string): Observable<{ token: string}>{
    return this.http.post<{ token: string}>(`${this.apiUrl}/login`, { numeroEmpleado, empleadoPassword }).pipe(
      tap(response => {
        localStorage.setItem(this.employeeKey, JSON.stringify(response));
      })
    )
  }

  logout(): void {
    localStorage.removeItem(this.employeeKey);
    this.router.navigate(['/login']);
  }

  getEmployee(): { id: number, nombre: string, edad: number, direccion: string, salario: number, rol: string } | null {
    const user = localStorage.getItem('empleado');
    return user ? JSON.parse(user) : null;
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

}
