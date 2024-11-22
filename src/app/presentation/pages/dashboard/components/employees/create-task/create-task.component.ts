import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetEmployeeIdUseCase } from '@application/usecases/employee/get-employee-id.usecase';
import { CreateTaskUseCase } from '@application/usecases/task/create-task.usecase';
import { Task } from '@domain/models/task.model';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit{

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

    const employeeID: number = Number(this.route.snapshot.paramMap.get('id'));

    this.getEmployeeById.execute(employeeID).subscribe({
      next: (data) =>{
        this.employeeName = data.nombre;
      },
      error: (err) => {
        console.error(err)
      }
    })

  }

  onsubmitTask(){

    const employeeID: number = Number(this.route.snapshot.paramMap.get('id'));

    const task: Task = new Task (
      this.titulo,
      this.categoria as 'Reparación' | 'Mantenimiento',
      this.prioridad as 'Alta' | 'Media' | 'Baja',
      this.fecha_limite,
      this.hora_limite,
      this.descripcion
    )

    this.createTask.execute(employeeID, task).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/empleados']);
      },
      error: (err) =>{
        console.log(task)
        console.error(err);
      }
    });



  }


}
