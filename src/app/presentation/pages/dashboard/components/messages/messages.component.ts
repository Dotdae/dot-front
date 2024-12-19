import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '@infrastructure/services/chat.service';
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';

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
export class MessagesComponent implements OnInit {

  constructor(private socketService: ChatService, private getName: AuthRepositoryImplementation){}

  users: { [key: string]: string} = {};
  messages: {from: string; message: string}[] = [];
  username: string = '';
  selectedUser: string | null = null;
  newMessage: string = '';


  ngOnInit(): void {

    this.username = this.getName.getEmployeeName();
    this.register();

    // Obtener usuarios conectados.
    this.socketService.on('update-users').subscribe((users) => {
      this.users = users;
    })

    // Escuchar mensajes privados.

    this.socketService.on('receive-message').subscribe((data) => {
      this.messages.push(data);
    })

  }

  // Registrar usuario.

  register(): void{
    if(this.username){
      this.socketService.emit('register', this.username);
    }
  }

  // Enviar mensaje privado
  sendMessage(): void {
    if (this.selectedUser && this.newMessage) {
      this.socketService.emit('private-message', {
        to: this.selectedUser,
        message: this.newMessage,
      });
      this.messages.push({ from: 'Tu', message: this.newMessage });
      this.newMessage = '';
    }
  }

  selectUser(userId: string): void {
    this.selectedUser = userId;
  }

   get availableUsers(): { [key: string]: string } {
    // Devuelve todos los usuarios excepto el conectado
    const filteredUsers = { ...this.users };
    delete filteredUsers[this.username]; // Eliminar el usuario conectado
    return filteredUsers;
  }


  objectKeys(obj: { [key: string]: any }): string[] {
    return Object.keys(obj);
  }

  disconnect(): void {
    // Emitir evento de desconexión al servidor
    this.socketService.emit('disconnect-user', this.username);

    // Limpiar datos locales
    this.users = {};
    this.messages = [];
    this.username = ''; // Limpiar el nombre de usuario
    this.selectedUser = null;
  }

}
