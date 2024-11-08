import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GetAllEmployeesUseCase } from '@domain/usecases/employee/get-all-employees.usecase';
import { Employee } from '@domain/models/employee.model';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})

export class EmployeesComponent implements OnInit {

  employees: Employee[] = []
  employeeNumber: number = 0;
  error: string = '';

  constructor(private getAllEmployesUseCase: GetAllEmployeesUseCase){}

  ngOnInit(): void{

    this.loadEmployees();

  }

  loadEmployees(): void{

    this.getAllEmployesUseCase.execute().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.employeeNumber = this.employees.length;
      },
      error: (err) => {
        this.error = 'Error al cargar empleados: ' + err.message;
      }
    });

  }

}
