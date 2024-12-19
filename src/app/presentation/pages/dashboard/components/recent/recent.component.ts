import { Component, OnInit } from '@angular/core';
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';
import { ModalComponent } from "../modal/modal.component";
import { GetDoneTasksUseCase } from '@application/usecases/task/get-done-task.usecase'
import { Task } from '@domain/models/task.model';
import { GetAllEmployeesUseCase } from '@application/usecases/employee/get-all-employees.usecase';
import { GetAllSectorsUseCase } from '@application/usecases/sector/get-all-sectors.usecase';
import { Employee } from '@domain/models/employee.model';
import { Sector } from '@domain/models/sector.model';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent implements OnInit{

  isModalOpen = false; // Estado para controlar la visibilidad del modal

  employeeData: any;
  employees: Employee[] = [];
  sectors: Sector[] = [];

  completedTasks: any[] = []; // Variable para almacenar las tareas completadas
  employeeName: string = '';


  constructor(private authRepository: AuthRepositoryImplementation,  private getDoneTasksUseCase: GetDoneTasksUseCase, private getEmployees: GetAllEmployeesUseCase, private getAllSectors: GetAllSectorsUseCase){}

  ngOnInit(): void {
    this.employeeData = this.authRepository.getEmployee();

    this.getEmployees.execute().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
      }
    });

    // Obtener sectores
    this.getAllSectors.execute().subscribe({
      next: (sectors) => {
        this.sectors = sectors;
      },
      error: (err) => {
        console.error('Error al cargar sectores:', err);
      }
    });

      // Llamar al caso de uso para obtener las tareas completadas
      this.getDoneTasksUseCase.execute().subscribe({
        next: (tasks: Task[]) => {
          this.completedTasks = tasks.map((task) => ({...task, employeeName: this.getEmployeeName(task.empleado_id)}));
          this.completedTasks.reverse(); // Motras las tareas completadas de más reciente a más antiguo
        },
        error: (err) => {
          console.error('Error al obtener las tareas completadas:', err);
        }
      });
  }

  openModal() {
    this.isModalOpen = true; // Abre el modal
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

  confirmModalAction() {
    console.log('Acción confirmada'); // Acción al confirmar
    this.isModalOpen = false; // Cierra el modal después de confirmar
  }

  getEmployeeName(employeeId?: number): string {
    if (!employeeId) {
      return 'Desconocido'; // Retorna un valor por defecto si el ID no es válido
    }
    const employee = this.employees.find((e) => e.id === employeeId);
    return employee ? employee.nombre : 'Desconocido';
  }

  getTimeElapsed(horaLimite: string): string {
    const limite = new Date();
    const [hours, minutes, seconds] = horaLimite.split(':').map(Number);
    limite.setHours(hours, minutes, seconds);

    const now = new Date();
    const diffInMs = now.getTime() - limite.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInSeconds < 60) {
      return `Hace unos segundos`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minutos`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
  }

  sortTasks() {
    console.log(this.completedTasks);
    // Ordenamos las tareas por hora_limite de más reciente a más antiguo
    this.completedTasks.sort((a, b) => new Date(b.hora_limite).getTime() - new Date(a.hora_limite).getTime());
    console.log(this.completedTasks);

  }

}
