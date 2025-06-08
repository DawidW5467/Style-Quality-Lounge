import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
