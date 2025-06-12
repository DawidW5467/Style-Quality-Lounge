import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  selectedMethod: string | null = null;

  constructor(private router: Router) { }

  selectPaymentMethod(method: string): void {
    this.selectedMethod = method;
  }

  goToHomePage(): void {

    this.router.navigate(['/']);
  }
}
