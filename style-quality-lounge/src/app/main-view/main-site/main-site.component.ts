import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-site',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {
  products: any[] = [];
  categoryProducts: any[] = [];
  categories: string[] = [];
  currentCategoryIndex: number = 0;
  categoryLoading: boolean = true;
  categoryError: string | null = null;

  currentCurrency: string = 'PLN';
  private currencySub?: Subscription;


  constructor(
    private productService: ProductService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.currencySub = this.currencyService.currency$.subscribe(curr => {
      this.currentCurrency = curr;

    });

    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log('Pobrane produkty:', data);
    });

    this.categories = this.productService.getCategories();
    this.loadProductsByCategory(this.categories[this.currentCategoryIndex]);
  }

  ngOnDestroy(): void {
    this.currencySub?.unsubscribe();
  }

  loadProductsByCategory(category: string): void {
    this.categoryLoading = true;
    this.categoryError = null;

    this.productService.getProductsByCategory(category).subscribe({
      next: (data) => {
        this.categoryProducts = data;
        this.categoryLoading = false;
        console.log(`Pobrano produkty z kategorii ${category}:`, data);
      },
      error: (err) => {
        this.categoryLoading = false;
        this.categoryError = `Nie udało się załadować produktów z kategorii ${category}`;
        console.error(`Błąd podczas pobierania produktów z kategorii ${category}:`, err);
      }
    });
  }

  previousCategory(): void {
    this.currentCategoryIndex = (this.currentCategoryIndex - 1 + this.categories.length) % this.categories.length;
    this.loadProductsByCategory(this.categories[this.currentCategoryIndex]);
  }

  nextCategory(): void {
    this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
    this.loadProductsByCategory(this.categories[this.currentCategoryIndex]);
  }
}
