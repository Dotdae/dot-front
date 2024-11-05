import { Component } from '@angular/core';
import { NotificationsComponent } from "../../../../components/notifications/notifications.component";

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [NotificationsComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent {

}
