import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

// Zaktualizowany interfejs CartItem
interface CartItem {
  id_cart_position: number;
  quantity: number; // Dodana kolumna 'quantity'
  id_product: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_identity: string;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  onQuantityChange(change: number): void {
    this.quantityChange.emit(change);
  }

  onRemove(): void {
    this.remove.emit();
  }
}
