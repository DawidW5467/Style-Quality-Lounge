// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5555'; // URL do naszego serwera

  constructor(private http: HttpClient) { }

  // Ta metoda pobiera WSZYSTKIE produkty
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  // Ta metoda pobiera konkrenty produkt o konkrentym id
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  // Ta metoda pobiera produkty z konkretnej kategorii
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/category/${category}`);
  }

  private categories: string[] = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports'
  ];

  getCategories(): string[] {
    return this.categories;
  }

}

