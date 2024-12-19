export class Sector {

  constructor(
    public id: number,
    public nombre: string,
    public empleado_id: number,
    public numero_empleados: number,
    public descripcion?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ){}

}
