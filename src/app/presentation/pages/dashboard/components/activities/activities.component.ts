import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import interact from 'interactjs';
import { CardComponent } from './components/card/card.component';
import { GetEmployeeTasksUseCase } from '@application/usecases/task/get-employee-tasks.usecase';
import { updateTaskStatusUseCase } from '@application/usecases/task/update-task-status.usecase';
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
    private updateStatusTask: updateTaskStatusUseCase
  ){}

  ngOnInit(): void {

    this.getEmployeeTask.execute(16).subscribe({
      next: (tasks ) => {

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
