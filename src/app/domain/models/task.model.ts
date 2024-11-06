export class Task {

  constructor(
    public id: number,
    public titulo: string,
    public categoria: 'Reparación' | 'Mantenimiento',
    public empleadoId: number,
    public prioridad: 'Alta' | 'Media' | 'Baja',
    public fechaLimite: Date,
    public horaLimite: string,
    public descripcion: string,
    public status: 'Pendiente' | 'En proceso' | 'Completada' = 'Pendiente'
  ){}
}
