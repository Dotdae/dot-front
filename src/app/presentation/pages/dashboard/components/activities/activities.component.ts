import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import interact from 'interactjs';
import { CardComponent } from './components/card/card.component';
import { GetEmployeeTasksUseCase } from '@application/usecases/task/get-employee-tasks.usecase';
import { updateTaskStatusUseCase } from '@application/usecases/task/update-task-status.usecase';
import { updateTaskTimeUseCase } from '@application/usecases/task/update-task-time.usecase';
import { UpdateNumberSectorUseCase } from '@application/usecases/sector/update-number-sector.usecase';
import { Task } from '@domain/models/task.model';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit{

  tasks: Task[] = [];

  constructor(
    private getEmployeeTask: GetEmployeeTasksUseCase,
    private updateStatusTask: updateTaskStatusUseCase,
    private updateTimeTask: updateTaskTimeUseCase,
    private updateNumberSector: UpdateNumberSectorUseCase
  ){}

  ngOnInit(): void {

    this.getEmployeeTask.execute(16).subscribe({
      next: (tasks ) => {

        console.log(tasks);

        this.tasks = tasks.map(task => ({
            ...task,
        }));

      },
      error: (error) => {

        console.error(error)

      }
    })

    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
  interact('.kanban-task').draggable({
    listeners: {
      move(event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x.toString());
        target.setAttribute('data-y', y.toString());
      },
      end(event) {
        event.target.style.transform = '';
        event.target.removeAttribute('data-x');
        event.target.removeAttribute('data-y');
      },
    },
  });

  interact('.kanban-column').dropzone({
    accept: '.kanban-task',
    ondrop: (event) => {
      const taskId = event.relatedTarget.getAttribute('data-id');
      const newStatus: 'Pendiente' | 'En proceso' | 'Completada' =
        event.target.id === 'pending'
          ? 'Pendiente'
          : event.target.id === 'in-progress'
          ? 'En proceso' // Ajustado para coincidir con el modelo
          : 'Completada';

      this.updateTaskStatus(Number(taskId), newStatus);



       // Buscamos la tarea por el ID
       console.log(taskId);

      if(newStatus === 'Completada'){
        const currentTime = new Date();
        const time = currentTime.toTimeString().split(' ')[0];

        this.updateTimeTask.execute(Number(taskId), time).subscribe({
          next: (updatedTask) => {
            console.log('Task updated!')
          },
          error: (error) => {
            console.error(error);
          }
        })

        // Reducir numero de empleado
        const tareaSeleccionada = this.tasks.find(tarea => tarea.id === Number(taskId));

        // Verificamos si la tarea fue encontrada
        if (tareaSeleccionada) {
          // Accedemos al sector de la tarea seleccionada
          const nombre = tareaSeleccionada.sector;

          // Si el sector está vacío o no está asignado, mostramos un mensaje adecuado
          if (nombre) {
              console.log("Sector de la tarea: ", nombre);
              this.updateNumberSector.execute(nombre).subscribe({
               next: (updatedSector) => {
                 console.log('Sector updated!')
               },
               error: (error) => {
                 console.error(error);
               }
              });
          } else {
              console.log("Esta tarea no tiene un sector asignado.");
          }
          } else {
              console.log("Tarea no encontrada");
          }

      }

      // Update status on backend.

      this.updateStatusTask.execute(Number(taskId), newStatus).subscribe({
        next: (updatedTask) => {
          console.log('Task updated!')
        },
        error: (error) => {
          console.error(error);
        }
      })

    },
  });
}

updateTaskStatus(taskId: number, newStatus: 'Pendiente' | 'En proceso' | 'Completada') {
  const task = this.tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = newStatus;
  }
}

}
