export class Task {

  constructor(
    public titulo: string,
    public categoria: 'Reparación' | 'Mantenimiento',
    public prioridad: 'Alta' | 'Media' | 'Baja',
    public fecha_limite: string,
    public hora_limite: string,
    public descripcion: string,
    public sector: string,
    public id?: number,
    public empleado_id?: number,
    public status?: 'Pendiente' | 'En proceso' | 'Completada',
  ){}
}
