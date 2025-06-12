// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5555';

  constructor(private http: HttpClient) { }


  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }


  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }


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

