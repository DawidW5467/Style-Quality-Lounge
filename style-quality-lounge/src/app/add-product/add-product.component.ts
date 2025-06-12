import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';

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
  public info: string = '';
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  onSubmit() {
    const body = { id_user: this.auth.currentUserValue?.id_user ?? 0, name: this.product.name, price: this.product.price, description: this.product.description, id_category: this.product.id_category, condition: this.product.condition };
    this.http.post('http://localhost:5555/api/products', body)
      .subscribe({
        next: (response) => {
          console.log('Produkt dodany pomyślnie', response);
          this.info = 'Dodano produkt';
          setTimeout(()=> {this.router.navigate(['/'])},3000)

        },
        error: (error) => {
          console.error('Błąd podczas dodawania produktu', error);
          this.info = 'Błąd podczas dodawania produktu';
        }
      });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
