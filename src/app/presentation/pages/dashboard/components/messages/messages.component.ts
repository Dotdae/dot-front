import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '@infrastructure/services/chat.service';
import { Subscription } from 'rxjs';

// Definir el tipo del mensaje
interface PrivateMessage {
  senderId: string;
  msg: string;
}
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy {
  userList: any[] = []; // Lista de usuarios conectados
  messages: any[] = [];
  newMessage: string = ''; // El mensaje que se va a enviar
  selectedUser: string | null = null; // Usuario seleccionado para el chat privado

  userListSubscription!: Subscription; // Suscripción a la lista de usuarios

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Conectar al chat cuando el componente se inicializa

    // Suscribirse a la lista de usuarios conectados
    this.userListSubscription = this.chatService.userList$.subscribe(users => {
      this.userList = users;  // Actualizar la lista de usuarios
    });

    this.chatService.listenPrivateMessages().subscribe((data) => {
      console.log("Mensaje recibido:", data);
      this.messages.push(data);  // Agregar el mensaje recibido
    });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruya
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
  }

  // Función que selecciona un usuario para iniciar un chat privado
  selectUser(user: string): void {
    this.selectedUser = user;  // Establecer el usuario seleccionado
    this.messages = [];         // Limpiar los mensajes previos
    console.log(`Iniciando chat con ${user}`);
  }

    // Enviar mensaje privado
    sendMessage(): void {
      if (this.selectedUser && this.newMessage.trim()) {
        // Enviar mensaje a través del servicio
        this.chatService.sendPrivateMessage(this.selectedUser, this.newMessage);
        this.messages.push({ senderId: 'Tú', msg: this.newMessage }); // Mostrar el mensaje enviado
        this.newMessage = ''; // Limpiar el campo de mensaje
      }
    }
}
