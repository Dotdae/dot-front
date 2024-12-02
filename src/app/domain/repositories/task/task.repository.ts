import { Observable } from "rxjs";
import { Task } from "@domain/models/task.model";

export interface TaskRepository {

  createTask(employeeId: number, task: Task): Observable<void>;
  getEmployeeTasks(employeeId: number): Observable<Task[]>;

}
