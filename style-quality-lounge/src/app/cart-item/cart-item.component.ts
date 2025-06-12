import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../services/currency.service';

interface CartItem {
  id_cart_position: number;
  quantity: number;
  id_product: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_identity: string;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  constructor(
    public currencyService: CurrencyService
  ) {}

  onQuantityChange(change: number): void {
    const newQuantity = this.cartItem.quantity + change;
    if (newQuantity >= 1) {
      this.quantityChange.emit(change);
    }
  }

  onRemove(): void {
    this.remove.emit();
  }
}
