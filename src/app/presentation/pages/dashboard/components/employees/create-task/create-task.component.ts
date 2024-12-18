import { Component , OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetEmployeeIdUseCase } from '@application/usecases/employee/get-employee-id.usecase';
import { CreateTaskUseCase } from '@application/usecases/task/create-task.usecase';
import { Task } from '@domain/models/task.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit{

  @Output() close = new EventEmitter<void>(); // Emite un evento para cerrar el modal
  @Output() confirm = new EventEmitter<void>(); // Emite un evento para confirmar la acción
  @Input() employeeID!: number;


  employeeName: string = '';


  cat = [{
    id: 1,
    name: "Reparación",
  },{
    id: 2,
    name: "Mantenimiento",
  }];

  prio = [{
    id: 1,
    name: "Alta",
  },{
    id: 2,
    name: "Media",
  },
  {
    id: 3,
    name: "Baja",
  }];

  // Binding.
  titulo: string = '';
  categoria: string = '';
  prioridad: string = '';
  fecha_limite: string = '';
  hora_limite: string = '';
  descripcion: string = '';

  constructor(
    private getEmployeeById: GetEmployeeIdUseCase,
    private createTask: CreateTaskUseCase,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {


    this.getEmployeeById.execute(this.employeeID).subscribe({
      next: (data) =>{
        this.employeeName = data.nombre;
      },
      error: (err) => {
        console.error(err)
      }
    })

  }

  onsubmitTask(){


    const task: Task = new Task (
      this.titulo,
      this.categoria as 'Reparación' | 'Mantenimiento',
      this.prioridad as 'Alta' | 'Media' | 'Baja',
      this.fecha_limite,
      this.hora_limite,
      this.descripcion
    )

    this.createTask.execute(this.employeeID, task).subscribe({
      next: () => {
        Swal.fire({
             title: "Tarea asignada",
             text: `Se le ha asignado una tarea al empleado ${this.employeeName}.`,
             icon: "success",
             timer: 2000, // Duración del toast
             timerProgressBar: true, // Barra de progreso
           });
          this.closeModal();
      },
      error: (err) =>{
        console.log(task)
        console.error(err);
      }
    });


  }

  closeModal() {
    this.close.emit(); // Llama al método del componente padre para cerrar el modal
  }

  confirmAction() {
    this.confirm.emit(); // Llama al método del componente padre para confirmar
  }

}
