import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Employees.

import { EMPLOYEE_REPOSITORY_TOKEN } from './domain/repositories/employee/employee-respository.token';
import { EmployeeRepositoryImplementation } from './domain/repositories/employee/employee.repository.implementation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

    // Clean architecture providers.

    { provide: EMPLOYEE_REPOSITORY_TOKEN, useClass: EmployeeRepositoryImplementation },

  ]
};
