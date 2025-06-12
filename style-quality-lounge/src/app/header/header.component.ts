import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentCurrency: string;

  constructor(
    private router: Router,
    private currencyService: CurrencyService
  ) {
    this.currentCurrency = this.currencyService.getCurrency();
  }

  navigateTo(route: string): void {
    this.router.navigate(['/' + route]);
  }

  onCurrencyChange(currency: string): void {
    this.currencyService.setCurrency(currency);
    this.currentCurrency = currency;
  }
}
