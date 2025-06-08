// account-info.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AccountInfoComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pobierz dane profilu użytkownika
    this.loadUserProfile();

    // Subskrybuj zmiany statusu zalogowania
    this.authService.currentUser$.subscribe(user => {
      if (!user) {
        // Jeśli użytkownik został wylogowany, przekieruj do strony logowania
        this.router.navigate(['/login']);
      }
    });
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Nie udało się załadować profilu użytkownika';
        this.isLoading = false;
        console.error('Błąd ładowania profilu:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
