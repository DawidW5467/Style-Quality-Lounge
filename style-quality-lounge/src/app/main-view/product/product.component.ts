import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  product: any = null;
  loading: boolean = true;
  error: string | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
  }

  changeQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
    }
  }

  addToCart(): void {
    if (this.product) {
      console.log('Dodano', this.quantity, 'sztuk produktu', this.product.id_product, 'do koszyka');
    }
  }
}
