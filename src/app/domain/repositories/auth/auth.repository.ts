import { Observable } from "rxjs";
import { Employee } from "@domain/models/employee.model";

export interface AuthRepository {

  login(numeroEmpleado: number, empleadoPassword: string): Observable<Employee>;
  logout(): void;

}
