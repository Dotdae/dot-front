export class Notification {

  constructor(
    public id: number,
    public empleadoId: number,
    public mensaje: string,
    public leido: boolean = false,
    public createdAt?: Date,
    public updatedAt?: Date
  ){}

}
