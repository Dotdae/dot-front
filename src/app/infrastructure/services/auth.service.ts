import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUseCase } from '@application/usecases/auth/login.usecase';
import { LogoutUseCase } from '@application/usecases/auth/logout.usecase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase
  ) { }

  login(numeroEmpleado: number, empleadoPassword: string): Observable<{ token: string}> {

    return this.loginUseCase.execute(numeroEmpleado, empleadoPassword);

  }

  logout(): void {
    this.logoutUseCase.execute();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

}
