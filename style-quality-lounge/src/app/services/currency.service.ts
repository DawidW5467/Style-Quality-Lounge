import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'selectedCurrency';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private currentCurrency = new BehaviorSubject<string>(localStorage.getItem(STORAGE_KEY) || 'PLN');
  currency$ = this.currentCurrency.asObservable();


  private exchangeRates: { [key: string]: number } = {
    PLN: 1,
    EUR: 4.7,
    USD: 4.3
  };


  setCurrency(currency: string) {
    this.currentCurrency.next(currency);
    localStorage.setItem(STORAGE_KEY, currency);
  }

  getCurrency(): string {
    return this.currentCurrency.getValue();
  }


  convertPrice(pricePLN: number): number {
    const curr = this.getCurrency();
    const rate = this.exchangeRates[curr] || 1;
    return pricePLN / rate;
  }


  formatPrice(pricePLN: number): string {
    const curr = this.getCurrency();
    const converted = this.convertPrice(pricePLN);
    let symbol = '';
    switch (curr) {
      case 'PLN': symbol = 'zł'; break;
      case 'EUR': symbol = '€'; break;
      case 'USD': symbol = '$'; break;
      default: symbol = curr;
    }
    return `${converted.toFixed(2)} ${symbol}`;
  }


}
