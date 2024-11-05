import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  dropdownOpen: boolean = false;

  toggleDropdown(){
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(){
    this.dropdownOpen = false;
  }


}
