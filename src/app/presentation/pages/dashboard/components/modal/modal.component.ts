import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() data: { id: number; nombre: string; edad: number; direccion: string; salario: number; rol: string } | null = null;
  @Output() close = new EventEmitter<void>(); // Emite un evento para cerrar el modal
  @Output() confirm = new EventEmitter<void>(); // Emite un evento para confirmar la acción

  closeModal() {
    this.close.emit(); // Llama al método del componente padre para cerrar el modal
  }

  confirmAction() {
    this.confirm.emit(); // Llama al método del componente padre para confirmar
  }

}
