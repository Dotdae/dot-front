import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '@domain/models/sector.model';
import { SectorRepository } from '@domain/repositories/sectors/sector.repository';
import { SECTOR_REPOSITORY_TOKEN } from '@domain/repositories/sectors/sector-repository.token';

@Injectable({
  providedIn: 'root',
})

export class GetAllSectorsUseCase {
  constructor(@Inject(SECTOR_REPOSITORY_TOKEN) private sectorRepository: SectorRepository) {}

  execute(): Observable<Sector[]> {
    return this.sectorRepository.getAllSectors();
  }
}
