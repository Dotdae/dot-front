import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login.component';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { EmployeesComponent } from './presentation/pages/dashboard/components/employees/employees.component';
import { RecentComponent } from './presentation/pages/dashboard/components/recent/recent.component';

export const routes: Routes = [

  // Login route.

  {
    path: 'login', component: LoginComponent
  },

  // Dashboard route.
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
          path: '', component: RecentComponent,
      },
      {
        path: 'empleados', component: EmployeesComponent
      }
    ]
  },

  // Main page.

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }


];
