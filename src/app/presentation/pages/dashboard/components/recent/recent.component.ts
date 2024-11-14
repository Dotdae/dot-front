import { Component, OnInit } from '@angular/core';
import { AuthRepositoryImplementation } from '@infrastructure/auth/auth.repository.implementation';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css'
})
export class RecentComponent implements OnInit{

  employeeData: any;

  constructor(private authRepository: AuthRepositoryImplementation){}

  ngOnInit(): void {
    this.employeeData = this.authRepository.getEmployee();
  }

}
