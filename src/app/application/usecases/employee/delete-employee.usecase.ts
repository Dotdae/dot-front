import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeRepository } from "@domain/repositories/employee/employee.repository";
import { EMPLOYEE_REPOSITORY_TOKEN } from "@domain/repositories/employee/employee-respository.token";

@Injectable({
  providedIn: 'root'
})

export class DeleteEmployeeUseCase {

  constructor(@Inject(EMPLOYEE_REPOSITORY_TOKEN) private employeeRepository: EmployeeRepository) {}

  execute(id: number): Observable<void> {
    return this.employeeRepository.deleteEmployee(id);
  }

}
