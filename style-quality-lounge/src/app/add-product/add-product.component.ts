import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    name: '',
    price: 0,
    description: '',
    id_category: 1,
    condition: 'nowy'
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:5555/api/products', this.product)
      .subscribe({
        next: (response) => {
          console.log('Produkt dodany pomyślnie', response);
          this.router.navigate(['/']); // Przekierowanie po sukcesie
        },
        error: (error) => {
          console.error('Błąd podczas dodawania produktu', error);
        }
      });
  }

  onCancel() {
    this.router.navigate(['/']); // Przekierowanie po anulowaniu
  }
}
