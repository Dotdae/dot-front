import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket!: Socket;
  private userListSubject = new BehaviorSubject<string[]>([]);  // Lista de usuarios conectados
  public userList$ = this.userListSubject.asObservable(); // Observable que el componente puede suscribirse
  private currentUser: string | null = null;

  constructor() {}

   // Inicia la conexión del socket
   connect(userName: string): void {
    this.socket = io('http://localhost:4000', { withCredentials: true });

     // Emitir el nombre del usuario al servidor para establecerlo
     this.socket.emit('set-user-name', userName);
     // Escuchar la lista de usuarios conectados
     this.socket.on('user-list', (users: string[]) => {
      this.userListSubject.next(users);  // Actualizar la lista de usuarios
    });
  }

   // Desconectar el socket
   disconnect(): void {
    this.socket.disconnect();
  }

  sendPrivateMessage(recipientSocketId: string,  msg: string): void {
    if (this.socket) {
      const empleadoData = JSON.parse(localStorage.getItem('empleado') || '{}');
      const username = empleadoData.nombre;
      console.log('Enviando mensaje a:', recipientSocketId, 'Mensaje:', msg);  // Verifica los datos antes de enviarlos
      this.socket.emit('private-message', { recipientSocketId, username, msg });
    }
  }

  // Escuchar mensajes privados
  listenPrivateMessages() {
    return new Observable((observer) => {
      this.socket.on('private-message', (data: { senderId: string; msg: string }) => {
        observer.next(data);
      });
    });
  }

}
