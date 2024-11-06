import { Observable } from "rxjs";
import { Employee } from "../../models/employee.model";

export interface EmployeeRepository{

  getAllEmployees(): Observable<Employee[]>;
  getEmployeeById(id: number): Observable<Employee>;
  createEmployee(employee: Employee):Observable<Employee>;
  updateEmployee(id: number, employee: Employee): Observable<Employee>;
  deleteEmployee(id: number):Observable<void>;

}
