import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../../models/employee.model";
import { EmployeeRepository } from "../../repositories/employee/employee.repository";
import { EMPLOYEE_REPOSITORY_TOKEN } from "../../repositories/employee/employee-respository.token";

@Injectable({
  providedIn: 'root'
})

export class CreateEmployeeUseCase {

  constructor(@Inject(EMPLOYEE_REPOSITORY_TOKEN) private employeeRepository: EmployeeRepository) {}

  execute(employeeData: Employee): Observable<Employee> {
    return this.employeeRepository.createEmployee(employeeData);
  }

}
