import { InjectionToken } from '@angular/core';
import { SectorRepository } from './sector.repository';

export const SECTOR_REPOSITORY_TOKEN = new InjectionToken<SectorRepository>('SectorRepository');
