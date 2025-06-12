import { Component, OnInit } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService, User } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../services/currency.service';

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
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, RouterLink, HttpClientModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  currentUser: User | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.getCartItems(this.currentUser.id_user);
      } else {
        this.cartItems = [];
        this.loading = false;
        this.error = 'Musisz być zalogowany, aby zobaczyć koszyk.';
      }
    });
  }

  getCartItems(userId: number): void {
    this.loading = true;
    this.error = null;
    this.http.get<{ success: boolean, items: any[] }>(`http://localhost:5555/api/cart/${userId}`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.cartItems = response.items as CartItem[];
            console.log('Produkty w koszyku:', this.cartItems);
          } else {
            this.error = 'Nie udało się pobrać produktów z koszyka.';
            // console.error('Błąd z serwera:', response.message);
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

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {

      item.quantity = newQuantity;


      this.http.put(`http://localhost:5555/api/cart/${item.id_cart_position}`, { quantity: newQuantity })
        .subscribe({
          next: () => {
            console.log('Ilość zaktualizowana');
            this.calculateSummary();
          },
          error: (err) => {
            console.error('Błąd aktualizacji ilości:', err);
            alert('Nie udało się zaktualizować ilości produktu.');
          }
        });
    }
  }



  removeItem(itemToRemove: CartItem): void {

    if (!confirm(`Czy na pewno chcesz usunąć "${itemToRemove.product_name}" z koszyka?`)) {
      return;
    }

    this.http.delete(`http://localhost:5555/api/cart/${itemToRemove.id_cart_position}`)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            console.log('Produkt usunięty z koszyka pomyślnie!', response);

            this.cartItems = this.cartItems.filter(item => item.id_cart_position !== itemToRemove.id_cart_position);
            this.calculateSummary();
            alert('Produkt został usunięty z koszyka.');
          } else {
            console.error('Błąd podczas usuwania produktu z koszyka (server):', response.message);
            alert(`Nie udało się usunąć produktu: ${response.message}`);
          }
        },
        error: (error) => {
          console.error('Błąd HTTP podczas usuwania produktu:', error);
          alert('Wystąpił błąd podczas usuwania produktu z koszyka.');
        }
      });
  }


  calculateSummary(): { subtotal: number, shipping: number, total: number } {
    const subtotal = this.cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
    const shipping = this.cartItems.length > 0 ? 10.00 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }

  formatPrice(pricePLN: number): string {
    return this.currencyService.formatPrice(pricePLN);
  }

}
