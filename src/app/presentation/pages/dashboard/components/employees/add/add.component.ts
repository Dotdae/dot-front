import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEmployeeUseCase } from '@application/usecases/employee/create-employee.usecase';
import { Employee } from '@domain/models/employee.model';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  roles = [{
    id: 1,
    name: "Supervisor",
  },{
    id: 2,
    name: "Empleado",
  }];

  sexos = [{
    id: 1,
    name: "Masculino",
  },{
    id: 2,
    name: "Femenino",
  }];


  nombre: string = '';
  sexo: string = '';
  email: string = '';
  edad: number = 0;
  direccion: string = '';
  salario: number = 0;
  rol: string = "";

  constructor(
    private createEmployeeUseCase: CreateEmployeeUseCase,
    private router: Router
  ){}


  onSubmit(): void{

    const employee: Employee = new Employee (
      this.nombre,
      this.sexo as 'Masculino' | 'Femenino',
      this.email ,
      this.edad,
      this.direccion,
      this.salario,
      this.rol as 'Empleado' | 'Supervisor'
    );

    this.createEmployeeUseCase.execute(employee).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/empleados']);

      },
      error: () => {

        console.log('Error al crear al empleado')

      }
    });

  }

}
