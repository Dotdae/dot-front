import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetAllEmployeesUseCase } from '@application/usecases/employee/get-all-employees.usecase';
import { DeleteEmployeeUseCase } from '@application/usecases/employee/delete-employee.usecase';
import { Employee } from '@domain/models/employee.model';
import { AddComponent } from "./add/add.component";
import Swal from 'sweetalert2';
import { CreateTaskComponent } from './create-task/create-task.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [AddComponent, CreateTaskComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})

export class EmployeesComponent implements OnInit {

  isModalOpen = false; // Estado para controlar la visibilidad del modal
  isTaskOpen = false; // Flag para la tarea
  employees: Employee[] = []
  employeeID: any;
  employeeNumber: number = 0;
  femNumber: number = 0;
  menNumber: number = 0;
  error: string = '';

  // Paginación.

  currentPage: number = 1;
  itemsPerPage:  number = 10; // Solo mostaré tarjetas de 5x2.
  totalPages: number = 1;

  constructor(
    private getAllEmployesUseCase: GetAllEmployeesUseCase,
    private deleteEmployeeUseCase: DeleteEmployeeUseCase
  ){}

  ngOnInit(): void{

    this.loadEmployees();

  }

  loadEmployees(): void{

    this.getAllEmployesUseCase.execute().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.employeeNumber = this.employees.length;
        this.femNumber = this.employees.filter(emp => emp.sexo === 'Femenino').length;
        this.menNumber = this.employees.filter(emp => emp.sexo === 'Masculino').length;

        // Calcular el total de páginas.
        this.totalPages = Math.ceil(this.employeeNumber / this.itemsPerPage);

      },
      error: (err) => {
        this.error = 'Error al cargar empleados: ' + err.message;
      }
    });

  }

  // Función para cambiar de página.

  changePage(page: number): void{

    if(page < 1 || page > this.totalPages){
      return;
    }

    this.currentPage = page;
    this.loadEmployees(); // Vuelve a cargar los empleados de la página seleccionada.

  }

  // Obtener los empleados para la página actual.

  getPagedEmployees(): Employee[]{
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(startIndex, startIndex + this.itemsPerPage);
  }


  deleteEmployee(id: number): void{

    this.deleteEmployeeUseCase.execute(id).subscribe({
     next: () => {

        Swal.fire({
          title: "Empleado eliminado",
          text: "El empleado ha sido eliminado con éxito.",
          icon: "success",
          timer: 2000, // Duración del toast
          timerProgressBar: true, // Barra de progreso
        });

        this.loadEmployees();
     },
     error: (err) => {
      console.log(err);
     }
    })

  }

  openModal() {
    this.isModalOpen = true; // Abre el modal
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

  openCreateTask(id: any){
    this.employeeID = id;
    this.isTaskOpen = true;
  }

  closeCreateTask(){
    this.isTaskOpen = false;
  }


  confirmModalAction() {
    console.log('Acción confirmada'); // Acción al confirmar
    this.isModalOpen = false; // Cierra el modal después de confirmar
  }

  confirmTaskAction(){
    this.isTaskOpen = false;
  }

}
