import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Sector } from "@domain/models/sector.model";
import { SectorRepository } from "@domain/repositories/sectors/sector.repository";

@Injectable({
  providedIn: 'root'
})

export class SectorRepositoryImplementation implements SectorRepository{

  private apiUrl = 'https://dot-backend-dma3.onrender.com/api';

  constructor(private http: HttpClient){}

  getAllSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.apiUrl}/sectors`);
  }

  updateNumberEmployees(nombre: string): Observable<Sector> {
    return this.http.put<Sector>(`${this.apiUrl}/sector`, {nombre});
  }


}
