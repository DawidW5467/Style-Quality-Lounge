import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CartComponent } from '../cart/cart.component';

interface CartItem {
  id_cart_position: number;
  quantity: number;
  id_product: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_identity: string;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: CartItem[] = [];
  currentUserId: number | null = null;
  loading = true;
  error: string | null = null;
  selectedDeliveryMethod = 'courier';
  smsNotifications = false;

  deliveryMethods = [
    { id: 'courier', name: '🚚 Kurier', price: 14.99 },
    { id: 'pickup', name: '📦 Odbiór w punkcie', price: 9.99 },
    { id: 'next_day', name: '🚛 Kurier na następny dzień', price: 19.99 },
    { id: 'inpost', name: '📮 InPost', price: 12.99 }
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      imie: ['', Validators.required],
      nazwisko: ['', Validators.required],
      telefon: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      email: ['', [Validators.required, Validators.email]],
      ulica: ['', Validators.required],
      numer_domu: ['', Validators.required],
      kod_pocztowy: ['', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}')]],
      miasto: ['', Validators.required],
      dostawa: ['courier', Validators.required],
      sms: [false]
    });
  }

  ngOnInit(): void {
    // Sprawdź, czy użytkownik jest zalogowany
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserId = user.id_user;
        // Wypełnij niektóre pola formularza danymi użytkownika
        this.orderForm.patchValue({
          imie: user.name || '',
          nazwisko: user.surname || '',
          email: user.login || ''
        });
        // Pobierz koszyk użytkownika
        this.getCartItems(user.id_user);
      } else {
        this.loading = false;
        this.error = 'Musisz być zalogowany, aby złożyć zamówienie.';
        // Możesz przekierować do strony logowania
        this.router.navigate(['/login']);
      }
    });
  }

  getCartItems(userId: number): void {
    this.loading = true;
    this.error = null;
    this.http.get<{ success: boolean, items: CartItem[] }>(`http://localhost:5555/api/cart/${userId}`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.cartItems = response.items;
            console.log('Produkty w koszyku:', this.cartItems);
          } else {
            this.error = 'Nie udało się pobrać produktów z koszyka.';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Wystąpił błąd podczas pobierania koszyka.';
          this.loading = false;
          console.error('Błąd HTTP:', err);
        }
      });
  }

  onDeliveryMethodChange(methodId: string): void {
    this.selectedDeliveryMethod = methodId;
    this.orderForm.patchValue({ dostawa: methodId });
  }

  toggleSmsNotifications(): void {
    this.smsNotifications = !this.smsNotifications;
    this.orderForm.patchValue({ sms: this.smsNotifications });
  }

  getDeliveryPrice(): number {
    const method = this.deliveryMethods.find(m => m.id === this.selectedDeliveryMethod);
    return method ? method.price : 0;
  }

  getSmsPrice(): number {
    return this.smsNotifications ? 0.99 : 0;
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.getDeliveryPrice() + this.getSmsPrice();
  }

  submitOrder(): void {
    if (this.orderForm.invalid) {
      // Zaznacz wszystkie pola jako dotknięte, aby pokazać błędy walidacji
      Object.keys(this.orderForm.controls).forEach(key => {
        const control = this.orderForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    if (!this.currentUserId) {
      this.error = 'Musisz być zalogowany, aby złożyć zamówienie.';
      return;
    }

    // Pobierz wartości z formularza
    const formValues = this.orderForm.value;

    // Przygotuj dane zamówienia
    const orderData = {
      id_user: this.currentUserId,
      ulica: formValues.ulica,
      numer_domu: formValues.numer_domu,
      kod_pocztowy: formValues.kod_pocztowy,
      miasto: formValues.miasto,
      metoda_dostawy: formValues.dostawa,
      powiadomienia_sms: formValues.sms,
      suma: this.calculateTotal(),
      items: this.cartItems.map(item => ({
        id_product: item.id_product,
        quantity: item.quantity,
        price: item.product_price
      }))
    };

    // Wyślij zamówienie do API
    this.http.post<{ success: boolean, message: string, order_id?: number }>('http://localhost:5555/api/orders', orderData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('Zamówienie zostało złożone pomyślnie!');
            // Przekieruj do strony potwierdzenia zamówienia lub płatności
            this.router.navigate(['/payment'], {
              queryParams: { order_id: response.order_id }
            });
          } else {
            this.error = `Błąd podczas składania zamówienia: ${response.message}`;
          }
        },
        error: (err) => {
          this.error = 'Wystąpił błąd podczas składania zamówienia.';
          console.error('Błąd HTTP:', err);
        }
      });
  }
}
