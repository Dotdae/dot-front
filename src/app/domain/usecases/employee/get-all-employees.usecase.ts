import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeeRepository } from '../../repositories/employee/employee.repository';
import { EMPLOYEE_REPOSITORY_TOKEN } from '../../repositories/employee/employee-respository.token';

@Injectable({
  providedIn: 'root',
})

export class GetAllEmployeesUseCase {
  constructor(@Inject(EMPLOYEE_REPOSITORY_TOKEN) private employeeRepository: EmployeeRepository) {}

  execute(): Observable<Employee[]> {
    return this.employeeRepository.getAllEmployees();
  }
}
