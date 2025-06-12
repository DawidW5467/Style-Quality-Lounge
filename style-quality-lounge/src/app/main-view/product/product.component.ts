import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { AuthService, User } from '../../services/auth.service';
import { DecimalPipe } from '@angular/common';
import { CurrencyService } from '../../services/currency.service'; // <--- import CurrencyService
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule, DecimalPipe],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: any = null;
  loading: boolean = true;
  error: string | null = null;
  quantity: number = 1;
  currentUser: User | null = null;

  pricePLN: number = 0; // oryginalna cena w PLN z backendu
  unitPrice: number = 0; // przeliczona cena jednostkowa
  totalPrice: number = 0; // przeliczona cena całkowita

  private currencySub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    public currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
        this.productService.getProduct(Number(productId)).subscribe({
          next: (data) => {
            this.product = data;
            this.loading = false;

            // Zapisujemy cenę w PLN i ustawiamy unitPrice i totalPrice
            this.pricePLN = this.product.price;
            this.updatePrices();

            console.log('Produkt załadowany:', this.product);
          },
          error: (err) => {
            this.error = 'Nie udało się załadować produktu';
            this.loading = false;
            console.error('Błąd podczas ładowania produktu:', err);
          }
        });
      } else {
        this.error = 'Brak identyfikatora produktu';
        this.loading = false;
      }
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('Aktualny użytkownik (ProductComponent):', this.currentUser);
    });

    // Subskrybujemy zmianę waluty, żeby przeliczyć ceny automatycznie
    this.currencySub = this.currencyService.currency$.subscribe(() => {
      this.updatePrices();
    });
  }

  ngOnDestroy(): void {
    this.currencySub?.unsubscribe();
  }

  changeQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
      this.updatePrices();
    }
  }

  updatePrices(): void {
    console.log('Cena PLN:', this.pricePLN);
    console.log('Aktualna waluta:', this.currencyService.getCurrency()); // jeśli masz taką metodę

    this.unitPrice = this.currencyService.convertPrice(this.pricePLN);
    this.totalPrice = this.unitPrice * this.quantity;

    console.log('Cena jednostkowa po przeliczeniu:', this.unitPrice);
    console.log('Cena całkowita:', this.totalPrice);
  }


  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  formatConvertedPrice(price: number): string {
    let symbol = '';
    const curr = this.currencyService.getCurrency();
    switch (curr) {
      case 'PLN': symbol = 'zł'; break;
      case 'EUR': symbol = '€'; break;
      case 'USD': symbol = '$'; break;
      default: symbol = curr;
    }
    return `${price.toFixed(2)} ${symbol}`;
  }


  addToCart(): void {
    if (!this.currentUser) {
      alert('Musisz być zalogowany, aby dodać produkt do koszyka.');
      return;
    }

    if (this.product) {
      const id_user = this.currentUser.id_user;

      const cartItem = {
        id_product: this.product.id_product,
        id_user: id_user,
        quantity: this.quantity
      };

      this.http.post('http://localhost:5555/api/cart', cartItem)
        .subscribe({
          next: (response) => {
            console.log('Produkt dodany do koszyka pomyślnie!', response);
            alert('Produkt dodany do koszyka!');
            this.router.navigate(['../cart/']);
          },
          error: (error) => {
            console.error('Błąd podczas dodawania produktu do koszyka:', error);
            alert('Wystąpił błąd podczas dodawania produktu do koszyka.');
          }
        });
    }
  }
}
