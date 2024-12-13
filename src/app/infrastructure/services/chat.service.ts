import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket!: Socket;

  constructor() {}

   // Inicia la conexión del socket
   connect(userName: string): void {
    this.socket = io('http://localhost:4000', { withCredentials: true });

    // Configurar el evento para establecer el nombre del usuario
    this.socket.emit('set-user-name', userName);
  }

   // Desconecta el socket
   disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

   // Escucha la lista de usuarios conectados
   getUserList(): Observable<string[]> {
    return new Observable((subscriber) => {
      this.socket.on('user-list', (users: string[]) => {
        subscriber.next(users);
      });
    });
  }


}
