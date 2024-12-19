import { Observable } from "rxjs";
import { Sector } from "../../models/sector.model";

export interface SectorRepository{

  getAllSectors(): Observable<Sector[]>;

}
