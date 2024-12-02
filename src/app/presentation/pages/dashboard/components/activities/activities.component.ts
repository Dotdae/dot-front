import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import interact from 'interactjs';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements AfterViewInit{

  cards = [
    {
      id: 'todo',
      title: 'Tareas asignadas',
      color: '#D0DCF8',
      tasks: [
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },

      ]
    },
    {
      id: 'in-progress',
      title: 'En progreso',
      color: '#F9E3CE',
      tasks: [
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },
      ]
    },
    {
      id: 'done',
      title: 'Terminadas',
      color: '#C4F4E6',
      tasks: [
        {
          id: 1,
          title: 'Some task',
          categoria: 'Reparación',
          prioridad: 'Alta',
          descripcion: 'Esta es la descripción de la tarea',
          progress: 45
        },
      ]
    }
  ]

  ngAfterViewInit(): void {
    const componentInstance = this;  // Guardamos el valor de `this`

    interact('.task')
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x.toString());
            target.setAttribute('data-y', y.toString());
          },
        },
      })
      .on('dragend', (event) => {
        const target = event.target;

        // Reinicia las coordenadas después de soltar
        target.style.transform = '';
        target.removeAttribute('data-x');
        target.removeAttribute('data-y');
      });

    interact('.column').dropzone({
      accept: '.task',
      ondrop(event) {
        const task = event.relatedTarget;  // Elemento arrastrado
        const targetColumn = event.target.querySelector('.task-list');

        if (targetColumn) {
          // Cambiar el color de la tarjeta cuando se coloca en un nuevo contenedor
          task.style.transition = 'transform 0.3s ease-in-out'; // Aplica transición suave
          targetColumn.appendChild(task);

          // Cambiar el color de la tarjeta según el contenedor de destino
          const columnId = event.target.getAttribute('data-id');
          const column = componentInstance.cards.find((card) => card.id === columnId);  // Usamos `componentInstance` para acceder a `this.cards`
          if (column) {
            task.style.backgroundColor = column.color; // Cambia el color de la tarjeta al color de la columna
          }

          // Limpia las transformaciones después de que termine la animación
          setTimeout(() => {
            task.style.transition = '';
            task.style.transform = '';
          }, 300); // Espera a que termine la animación
        }
      },
    });
  }

}
