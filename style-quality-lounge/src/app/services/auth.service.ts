// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  id_user: number;
  name: string;
  surname: string;
  login: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5555/api';


  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {

    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }


  public isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  // Logowanie użytkownika
  login(login: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { login, password })
      .pipe(
        tap(response => {
          if (response.success && response.user) {

            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }


  logout(): void {
    // Usuń dane użytkownika z localStorage
    localStorage.removeItem('currentUser');
    // Zresetuj BehaviorSubject
    this.currentUserSubject.next(null);
  }

  register(name: string, surname: string, login: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      name, surname, login, password
    });
  }


  getUserProfile(): Observable<User | null> {
    const currentUser = this.currentUserValue;

    if (!currentUser) {
      return of(null);
    }


    return of(currentUser);
  }
}
