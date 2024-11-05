import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login.component';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { EmployeesComponent } from './presentation/pages/dashboard/components/employees/employees.component';
import { RecentComponent } from './presentation/pages/dashboard/components/recent/recent.component';
import { MessagesComponent } from './presentation/pages/dashboard/components/messages/messages.component';
import { ActivitiesComponent } from './presentation/pages/dashboard/components/activities/activities.component';
import { SectorsComponent } from './presentation/pages/dashboard/components/sectors/sectors.component';
import { WarehouseComponent } from './presentation/pages/dashboard/components/warehouse/warehouse.component';

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
      }
    ]
  },

  // Main page.

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }


];
