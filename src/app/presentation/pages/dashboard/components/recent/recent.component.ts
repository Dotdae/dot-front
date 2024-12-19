import { Component, OnInit } from '@angular/core';
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';
import { ModalComponent } from "../modal/modal.component";
import { GetDoneTasksUseCase } from '@application/usecases/task/get-done-task.usecase'
import { Task } from '@domain/models/task.model';
import { GetAllEmployeesUseCase } from '@application/usecases/employee/get-all-employees.usecase';
import { Employee } from '@domain/models/employee.model';

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

  completedTasks: any[] = []; // Variable para almacenar las tareas completadas
  employeeName: string = '';


  constructor(private authRepository: AuthRepositoryImplementation,  private getDoneTasksUseCase: GetDoneTasksUseCase, private getEmployees: GetAllEmployeesUseCase){}

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

      // Llamar al caso de uso para obtener las tareas completadas
      this.getDoneTasksUseCase.execute().subscribe({
        next: (tasks: Task[]) => {
          this.completedTasks = tasks.map((task) => ({...task, employeeName: this.getEmployeeName(task.empleado_id)})); // Asignar las tareas completadas a la variable
          console.log(this.completedTasks);
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

}
