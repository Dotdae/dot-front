import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetAllEmployeesUseCase } from '@application/usecases/employee/get-all-employees.usecase';
import { DeleteEmployeeUseCase } from '@application/usecases/employee/delete-employee.usecase';
import { Employee } from '@domain/models/employee.model';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})

export class EmployeesComponent implements OnInit {

  employees: Employee[] = []
  employeeNumber: number = 0;
  femNumber: number = 0;
  menNumber: number = 0;
  error: string = '';

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
        this.employees.forEach(employee => {

          if(employee.sexo === 'Femenino'){
            this.femNumber++;
          }
          else if(employee.sexo === 'Masculino'){
            this.menNumber++;
          }

        });

      },
      error: (err) => {
        this.error = 'Error al cargar empleados: ' + err.message;
      }
    });

  }

  deleteEmployee(id: number): void{

    this.deleteEmployeeUseCase.execute(id).subscribe({
     next: () => {
      this.loadEmployees();
     },
     error: (err) => {
      console.log(err);
     }
    })

  }

}
