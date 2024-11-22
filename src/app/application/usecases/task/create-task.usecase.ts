import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { TaskRepository } from "@domain/repositories/task/task.repository";
import { TASK_REPOSITORY_TOKEN } from "@domain/repositories/task/task.respository.token";
import { Task } from "@domain/models/task.model";


@Injectable({
  providedIn: 'root'
})

export class CreateTaskUseCase {

  constructor(@Inject(TASK_REPOSITORY_TOKEN) private taskRepository: TaskRepository) {}

  execute(employeeId: number, task: Task): Observable<void> {
    return this.taskRepository.createTask(employeeId, task);
  }

}
