import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateEmployeeUseCase } from '../../../../../../domain/usecases/employee/create-employee.usecase';
import { Employee } from '../../../../../../domain/models/employee.model';
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

  nombre: string = '';
  edad: number = 0;
  direccion: string = '';
  salario: number = 0;
  rol: string = "";

  constructor(
    private createEmployeeUseCase: CreateEmployeeUseCase
  ){}


  onSubmit(): void{

    const employee: Employee = new Employee (
      this.nombre,
      this.edad,
      this.direccion,
      this.salario,
      this.rol as 'Empleado' | 'Supervisor'
    );

    this.createEmployeeUseCase.execute(employee).subscribe({
      next: () => {
        console.log('Empleado creado!');
      },
      error: () => {

        console.log('Error al crear al empleado')

      }
    });

  }

}
