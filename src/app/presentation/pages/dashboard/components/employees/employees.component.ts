import { Component, OnInit } from '@angular/core';
import { GetAllEmployeesUseCase } from '@application/usecases/employee/get-all-employees.usecase';
import { DeleteEmployeeUseCase } from '@application/usecases/employee/delete-employee.usecase';
import { Sector } from '@domain/models/sector.model'; // Importar el modelo de Sector
import { Employee } from '@domain/models/employee.model';
import { AddComponent } from "./add/add.component";
import Swal from 'sweetalert2';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [AddComponent, CreateTaskComponent, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  // Variables para los filtros de búsqueda
  searchName: string = '';
  searchSector: number = 0; // Cambiado a sectorId
  searchStatus: string = '';

  isModalOpen = false;
  isTaskOpen = false;
  employees: Employee[] = [];
  sectors: Sector[] = []; // Lista de sectores
  employeeID: any;
  employeeNumber: number = 0;
  femNumber: number = 0;
  menNumber: number = 0;
  error: string = '';

  // Opciones de los filtros
  statuses = ['Activo', 'Inactivo'];

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  filteredEmployees: Employee[] = [];

  constructor(
    private getAllEmployesUseCase: GetAllEmployeesUseCase,
    private deleteEmployeeUseCase: DeleteEmployeeUseCase
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadSectors();
  }

  loadEmployees(): void {
    this.getAllEmployesUseCase.execute().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = data; // Inicializa con todos los empleados

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

  loadSectors(): void {
    // Simulación de la carga de sectores. Deberías obtenerlos de una API o servicio
    this.sectors = [
      new Sector(1, 'TI'),
      new Sector(2, 'Ventas'),
      new Sector(3, 'Recursos Humanos')
    ];
  }

  // Función para cambiar de página.
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadEmployees(); // Vuelve a cargar los empleados de la página seleccionada.
  }

  // Obtener los empleados para la página actual.
  getPagedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Filtrar empleados
  filterEmployees() {
    this.filteredEmployees = this.employees.filter(employee => {
      const matchesName = employee.nombre.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesSector = this.searchSector ? employee.sectorId === this.searchSector : true;
      const matchesStatus = this.searchStatus ? employee.status === this.searchStatus : true;
      return matchesName && matchesSector && matchesStatus;
    });
  }

  deleteEmployee(id: number): void {
    this.deleteEmployeeUseCase.execute(id).subscribe({
      next: () => {
        Swal.fire({
          title: "Empleado eliminado",
          text: "El empleado ha sido eliminado con éxito.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });

        this.loadEmployees();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openModal() {
    this.isModalOpen = true; // Abre el modal
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

  openCreateTask(id: any) {
    this.employeeID = id;
    this.isTaskOpen = true;
  }

  closeCreateTask() {
    this.isTaskOpen = false;
  }

  confirmModalAction() {
    console.log('Acción confirmada'); // Acción al confirmar
    this.isModalOpen = false; // Cierra el modal después de confirmar
  }

  confirmTaskAction() {
    this.isTaskOpen = false;
  }
}
