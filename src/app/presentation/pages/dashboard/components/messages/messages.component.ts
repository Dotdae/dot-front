import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '@infrastructure/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy {
  connectedUsers: any[] = [];  // Lista de usuarios conectados
  private userListSubscription!: Subscription;  // Suscripción a la lista de usuarios

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {

    // Suscribirse a la lista de usuarios conectados
    this.userListSubscription = this.chatService.userList$.subscribe((users: string[]) => {
      this.connectedUsers = users;  // Actualizar la lista de usuarios
      console.log(this.connectedUsers);
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción y desconectar el socket al destruir el componente
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
    this.chatService.disconnect();
  }
}
