import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from "../../../../components/notifications/notifications.component";
import { AuthRepositoryImplementation } from '@domain/repositories/auth/auth.repository.implementation';
@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [NotificationsComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent implements OnInit{

  employeeData: any;

  constructor(private authRepository: AuthRepositoryImplementation){}

  ngOnInit(): void {
    this.employeeData = this.authRepository.getEmployee();
    console.log(this.employeeData)
  }

}
