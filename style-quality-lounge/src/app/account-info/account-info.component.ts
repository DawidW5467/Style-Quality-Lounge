import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

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
  stats: {
    listedProducts: number;
    soldProducts: number;
  } = {
    listedProducts: 0,
    soldProducts: 0
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();

    this.authService.currentUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.loadUserStats(user.id_user);
      }
    });
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.authService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        if (user) {
          this.loadUserStats(user.id_user);
        }
      },
      error: (error) => {
        this.errorMessage = 'Nie udało się załadować profilu użytkownika';
        this.isLoading = false;
        console.error('Błąd ładowania profilu:', error);
      }
    });
  }

  loadUserStats(userId: number): void {
    // Pobierz liczbę wystawionych produktów
    this.http.get<any>(`http://localhost:5555/products/user/${userId}/count`)
      .subscribe({
        next: (response) => {
          this.stats.listedProducts = response.count || 0;
        },
        error: (error) => {
          console.error('Błąd pobierania liczby produktów:', error);
        }
      });

    // Pobierz liczbę sprzedanych produktów
    this.http.get<any>(`http://localhost:5555/orders/seller/${userId}/count`)
      .subscribe({
        next: (response) => {
          this.stats.soldProducts = response.count || 0;
        },
        error: (error) => {
          console.error('Błąd pobierania liczby sprzedanych produktów:', error);
        }
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
