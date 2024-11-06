export class Log{

  constructor(
    public id: number,
    public idEmpleado: number,
    public tipoActividad: string,
    public descripcion: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ){}

}
