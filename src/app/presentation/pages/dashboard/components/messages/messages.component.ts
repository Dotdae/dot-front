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
export class MessagesComponent implements OnInit{

  users: any[] = []; // Aquí guardaremos la lista de usuarios conectados

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Obtener la lista de usuarios conectados desde el servicio
    this.chatService.getUserList().subscribe((users) => {
      console.log('Usuarios conectados:', users);
    });
  }
}
