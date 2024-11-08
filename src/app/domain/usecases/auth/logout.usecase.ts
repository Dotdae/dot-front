// use-cases/auth/logout.usecase.ts
import { Injectable, Inject } from '@angular/core';
import { AuthRepository } from "@domain/repositories/auth/auth.repository";
import { AUTH_REPOSITORY_TOKEN } from "@domain/repositories/auth/auth.repository.token";


@Injectable({
  providedIn: 'root'
})
export class LogoutUseCase {
  constructor(@Inject(AUTH_REPOSITORY_TOKEN) private authRepository: AuthRepository) {}

  execute(): void {
    this.authRepository.logout();
  }

}
