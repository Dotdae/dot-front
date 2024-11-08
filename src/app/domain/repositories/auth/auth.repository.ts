import { Observable } from "rxjs";

export interface AuthRepository {

  login(numeroEmpleado: number, empleadoPassword: string): Observable<{token: string}>;
  logout(): void;

}
