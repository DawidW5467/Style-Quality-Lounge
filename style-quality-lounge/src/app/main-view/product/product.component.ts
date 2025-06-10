import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, ROUTER_INITIALIZER, RouterLink} from '@angular/router';
import { ProductService } from '../../services/product.service';
import {Router, RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { AuthService, User } from '../../services/auth.service'; // Importuj AuthService i User


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink,RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  product: any = null;
  loading: boolean = true;
  error: string | null = null;
  quantity: number = 1;
  currentUser: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    // Pobierz parametr ID z URL
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) {
        // Pobierz dane produktu
        this.productService.getProduct(Number(productId)).subscribe({
          next: (data) => {
            this.product = data;
            this.loading = false;
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

  }

  changeQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
    }
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
        quantity: this.quantity // Możesz również wysłać ilość, jeśli chcesz ją przechowywać w koszyku
      };

      this.http.post('http://localhost:5555/api/cart', cartItem)
        .subscribe({
          next: (response) => {
            console.log('Produkt dodany do koszyka pomyślnie!', response);
            // Tutaj możesz dodać logikę do wyświetlania komunikatu sukcesu użytkownikowi
            alert('Produkt dodany do koszyka!');
            this.router.navigate(['../cart/']);
          },
          error: (error) => {
            console.error('Błąd podczas dodawania produktu do koszyka:', error);
            // Tutaj możesz dodać logikę do wyświetlania komunikatu błędu użytkownikowi
            alert('Wystąpił błąd podczas dodawania produktu do koszyka.');
          }
        });
    }
  }
}
