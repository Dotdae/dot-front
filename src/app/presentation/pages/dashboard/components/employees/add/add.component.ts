import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEmployeeUseCase } from '@application/usecases/employee/create-employee.usecase';
import { Employee } from '@domain/models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  @Output() close = new EventEmitter<void>(); // Emite un evento para cerrar el modal
  @Output() confirm = new EventEmitter<void>(); // Emite un evento para confirmar la acción

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
        this.showToast('Empleado creado exitosamente', 'success');
        setTimeout(() => {
          this.closeModal();
        }, 2000); // Espera 2 segundos antes de cerrar el modal

      },
      error: () => {

        console.log('Error al crear al empleado')

      }
    });

  }

  closeModal() {
    this.close.emit(); // Llama al método del componente padre para cerrar el modal
  }

  confirmAction() {
    this.confirm.emit(); // Llama al método del componente padre para confirmar
  }

   // Método para mostrar un toast
   showToast(message: string, type: 'success' | 'error'): void {
    Swal.fire({
      title: message,
      text: "El empleado ha sido añadido con éxito.",
      icon: type,
      timer: 2000, // Duración del toast
      timerProgressBar: true, // Barra de progreso
    });

  }

}
