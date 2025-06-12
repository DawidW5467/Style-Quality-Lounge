import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  redirectCountdown: number = 0;
  redirectTimer: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { login, password } = this.loginForm.value;

    this.authService.login(login, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.user) {
          const userName = response.user.name || response.user.login || 'Użytkowniku';
          this.successMessage = `Witaj, ${userName}! Za chwilę zostaniesz przekierowany na stronę główną.`;
          this.startRedirectCountdown();
        } else {
          this.errorMessage = response.message || 'Wystąpił błąd podczas logowania';
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Nieprawidłowy login lub hasło';
        } else if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Wystąpił błąd podczas logowania. Spróbuj ponownie później.';
        }
        console.error('Błąd logowania:', error);
      }
    });
  }

  startRedirectCountdown(): void {
    this.redirectCountdown = 3; // 3 sek.

    this.redirectTimer = setInterval(() => {
      this.redirectCountdown--;

      if (this.redirectCountdown <= 0) {
        clearInterval(this.redirectTimer);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.redirectTimer) {
      clearInterval(this.redirectTimer);
    }
  }


  get loginControl() { return this.loginForm.get('login'); }
  get passwordControl() { return this.loginForm.get('password'); }
}
