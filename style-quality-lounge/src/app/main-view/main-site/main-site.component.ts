// src/app/main-view/main-site/main-site.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-main-site',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {
  // Ta tablica będzie przechowywać WSZYSTKIE produkty
  products: any[] = [];

  // Te zmienne są do produktów z kategorii
  categoryProducts: any[] = [];
  categories: string[] = [];
  currentCategoryIndex: number = 0;
  categoryLoading: boolean = true;
  categoryError: string | null = null;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Ta metoda pobiera WSZYSTKIE produkty z bazy danych
    this.productService.getProducts().subscribe(data => {
      this.products = data; // Zapisujemy WSZYSTKIE produkty
      console.log('Pobrane produkty:', data);
    });

    // Pobierz listę kategorii
    this.categories = this.productService.getCategories();

    // Pobierz produkty z pierwszej kategorii
    this.loadProductsByCategory(this.categories[this.currentCategoryIndex]);
  }

  // Metoda do ładowania produktów z określonej kategorii
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

  // Przejście do poprzedniej kategorii
  previousCategory(): void {
    this.currentCategoryIndex = (this.currentCategoryIndex - 1 + this.categories.length) % this.categories.length;
    this.loadProductsByCategory(this.categories[this.currentCategoryIndex]);
  }

  // Przejście do następnej kategorii
  nextCategory(): void {
    this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
    this.loadProductsByCategory(this.categories[this.currentCategoryIndex]);
  }

}
