import { Observable } from "rxjs";
import { Task } from "@domain/models/task.model";

export interface TaskRepository {

  createTask(employeeId: number, task: Task): Observable<void>;
  getEmployeeTasks(employeeId: number): Observable<Task[]>;
  getDoneTasks(): Observable<Task[]>;
  updateTaskStatus(taskId: number, status: 'Pendiente' | 'En proceso' | 'Completada' ): Observable<Task>;
  updateTaskTime(taskId: number, time: string): Observable<Task>;

}
