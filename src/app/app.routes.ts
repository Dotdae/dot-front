import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login.component';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { EmployeesComponent } from './presentation/pages/dashboard/components/employees/employees.component';
import { RecentComponent } from './presentation/pages/dashboard/components/recent/recent.component';
import { MessagesComponent } from './presentation/pages/dashboard/components/messages/messages.component';
import { ActivitiesComponent } from './presentation/pages/dashboard/components/activities/activities.component';
import { SectorsComponent } from './presentation/pages/dashboard/components/sectors/sectors.component';
import { WarehouseComponent } from './presentation/pages/dashboard/components/warehouse/warehouse.component';
import { ReportsComponent } from './presentation/pages/dashboard/components/reports/reports.component';
import { ConfigurationComponent } from './presentation/pages/dashboard/components/configuration/configuration.component';
import { AddComponent } from './presentation/pages/dashboard/components/employees/add/add.component';

// Guards.

import { AuthGuard } from '@presentation/pages/login/auth.guard';
import { CreateTaskComponent } from '@presentation/pages/dashboard/components/employees/create-task/create-task.component';

export const routes: Routes = [

  // Login route.

  {
    path: 'login', component: LoginComponent
  },

  // Dashboard route.
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
          path: '', component: RecentComponent,
      },
      {
        path: 'empleados', component: EmployeesComponent
      },
      {
        path: 'agregar', component: AddComponent
      },
      {
        path: 'crear-tarea/:id', component: CreateTaskComponent
      },
      {
        path: 'mensajes', component: MessagesComponent
      },
      {
        path: 'actividades', component: ActivitiesComponent
      },
      {
        path: 'sectores', component: SectorsComponent
      },
      {
        path: 'almacen', component: WarehouseComponent
      },
      {
        path: 'reportes', component: ReportsComponent
      },
      {
        path: 'configuracion', component: ConfigurationComponent
      }
    ]
  },

  // Main page.

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }


];
