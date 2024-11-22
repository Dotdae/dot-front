import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Employees.

import { EMPLOYEE_REPOSITORY_TOKEN } from '@domain/repositories/employee/employee-respository.token';
import { EmployeeRepositoryImplementation } from '@infrastructure/employee/employee.repository.implementation';

// Auth.

import { AUTH_REPOSITORY_TOKEN } from '@domain/repositories/auth/auth.repository.token';
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';

// Task.

import { TASK_REPOSITORY_TOKEN } from '@domain/repositories/task/task.respository.token';
import { TaskRepositoryImplementation } from '@infrastructure/task/task.repository.implementation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

    // Clean architecture providers.

    { provide: EMPLOYEE_REPOSITORY_TOKEN, useClass: EmployeeRepositoryImplementation },
    { provide: AUTH_REPOSITORY_TOKEN, useClass: AuthRepositoryImplementation },
    { provide: TASK_REPOSITORY_TOKEN, useClass: TaskRepositoryImplementation}

  ]
};
