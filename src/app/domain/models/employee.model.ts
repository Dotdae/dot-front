import { Sector } from "./sector.model";

export class Employee {
  constructor(
    public nombre: string,
    public sexo: 'Masculino' | 'Femenino',
    public email: string,
    public edad: number,
    public direccion: string,
    public salario: number,
    public rol: 'Empleado' | 'Supervisor' = 'Empleado',
    public sector_actual?: string,    // Opcionalmente, puedes cargar el sector completo
    public sectorId?: number,  // Nuevo campo para asociar al sector
    public id?: number,
    public status?: 'Activo' | 'Inactivo',
    public userImage?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
