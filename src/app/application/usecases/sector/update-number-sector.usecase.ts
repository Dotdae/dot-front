import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '@domain/models/sector.model';
import { SectorRepository } from '@domain/repositories/sectors/sector.repository';
import { SECTOR_REPOSITORY_TOKEN } from '@domain/repositories/sectors/sector-repository.token';

@Injectable({
  providedIn: 'root',
})

export class UpdateNumberSectorUseCase {
  constructor(@Inject(SECTOR_REPOSITORY_TOKEN) private sectorRepository: SectorRepository) {}

  execute(nombre: string): Observable<Sector> {
    return this.sectorRepository.updateNumberEmployees(nombre);
  }
}
