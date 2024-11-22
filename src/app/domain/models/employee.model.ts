export class Employee{

  constructor(
    public nombre: string,
    public sexo: 'Masculino' | 'Femenino',
    public email: string,
    public edad: number,
    public direccion: string,
    public salario: number,
    public rol: 'Empleado' | 'Supervisor' = 'Empleado',
    public id?: number,
    public status?: 'Activo' | 'Inactivo',
    public userImage?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ){}

}
