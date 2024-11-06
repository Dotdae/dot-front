export class Employee{

  constructor(
    public id: number,
    public nombre: string,
    public edad: number,
    public direccion: string,
    public salario: number,
    public rol: 'Empleado' | 'Supervisor',
    public status: 'Activo' | 'Inactivo',
    public userImage?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ){}

}
