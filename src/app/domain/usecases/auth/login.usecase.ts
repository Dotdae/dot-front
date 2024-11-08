import { Injectable, Inject } from "@angular/core";
import { AuthRepository } from "@domain/repositories/auth/auth.repository";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AUTH_REPOSITORY_TOKEN } from "@domain/repositories/auth/auth.repository.token";

@Injectable({
  providedIn: 'root'
})


export class LoginUseCase {

  constructor(@Inject(AUTH_REPOSITORY_TOKEN) private authRepository: AuthRepository) {}

  execute(numeroEmpleado: number, empleadoPassword: string): Observable<{ token: string}>{
    return this.authRepository.login(numeroEmpleado, empleadoPassword).pipe(
      tap(response => {
        (this.authRepository as any).storeToken(response.token);
      })
    )
  }


}
