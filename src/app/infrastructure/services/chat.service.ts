import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://dot-backend-dma3.onrender.com/', { withCredentials: true });
  }

  emit(event: string, data: any): void{
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any>{
    return new Observable((suscriber) => {
      this.socket.on(event, (data) => suscriber.next(data));
    })
  }

}
