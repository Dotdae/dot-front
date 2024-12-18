import { Component, OnInit } from '@angular/core';
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent implements OnInit{

  isModalOpen = false; // Estado para controlar la visibilidad del modal

  employeeData: any;

  constructor(private authRepository: AuthRepositoryImplementation){}

  ngOnInit(): void {
    this.employeeData = this.authRepository.getEmployee();
  }

  openModal() {
    this.isModalOpen = true; // Abre el modal
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

  confirmModalAction() {
    console.log('Acción confirmada'); // Acción al confirmar
    this.isModalOpen = false; // Cierra el modal después de confirmar
  }

}
