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
      title: 'To do',
      color: 'bg-blue-300',
      tasks: [
        { id: 1, title: 'Some task', progress: 45},
        { id: 2, title: 'Another task', progress: 30},
      ]
    },
    {
      id: 'in-progress',
      title: 'In progress',
      color: 'bg-orange-300',
      tasks: [
        { id: 1, title: 'Some task', progress: 45},
        { id: 2, title: 'Another task', progress: 30},
      ]
    },
    {
      id: 'in-review',
      title: 'In review',
      color: 'bg-pink-300',
      tasks: [
        { id: 1, title: 'Some task', progress: 45},
        { id: 2, title: 'Another task', progress: 30},
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-teal-300',
      tasks: [
        { id: 1, title: 'Some task', progress: 45},
        { id: 2, title: 'Another task', progress: 30},
      ]
    }
  ]

  ngAfterViewInit(): void {
    interact('.task')
    .draggable({
      listeners: {
        move(event){
          const target = event.target;
          target.style.transform = `translate(${event.dx}px, ${event.dy}px)`;
        }
      }
    })
    .on('dragend', (event) => {
      const target = event.target;
      target.style.transform = "";
    });

    interact('.column').dropzone({
      accept: '.task',
      ondrop(event){
        const task = event.relatedTarget;
        const targetColumn = event.target.querySelector('.task-list');
        targetColumn.appendChild(task);
      }
    })
  }

}
