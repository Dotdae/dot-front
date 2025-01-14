import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "@domain/models/task.model";
import { TaskRepository } from "@domain/repositories/task/task.repository";

@Injectable({
  providedIn: 'root'
})

export class TaskRepositoryImplementation implements TaskRepository{

  private apiUrl = 'https://dot-backend-dma3.onrender.com/api';

  constructor(private http: HttpClient){}


  createTask(employeeId: number, task: Task): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/task/${employeeId}`, { task })
  }

  getEmployeeTasks(employeeId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/task/${employeeId}`);
  }

  getDoneTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/done-tasks`);
  }

  updateTaskStatus(taskId: number, status: "Pendiente" | "En proceso" | "Completada"): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/status/${taskId}`, { status });
  }

  updateTaskTime(taskId: number, hora_limite: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/time/${taskId}`, { hora_limite });
  }

}
