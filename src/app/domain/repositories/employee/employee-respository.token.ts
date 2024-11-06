import { InjectionToken } from '@angular/core';
import { EmployeeRepository } from '../employee/employee.repository';

export const EMPLOYEE_REPOSITORY_TOKEN = new InjectionToken<EmployeeRepository>('EmployeeRepository');
