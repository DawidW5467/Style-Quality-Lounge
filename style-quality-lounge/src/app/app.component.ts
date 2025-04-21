import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {LoginComponent} from './login/login.component';
import {FooterComponent} from './footer/footer.component';
import {RegisterComponent} from './register/register.component';
import {CartComponent} from './cart/cart.component';
import {CartItemComponent} from './cart-item/cart-item.component'
import {AccountInfoComponent} from './account-info/account-info.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {PaymentComponent} from './payment/payment.component';
import {MainSiteComponent} from './main-view/main-site/main-site.component'
import {ProductComponent} from './main-view/product/product.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoginComponent, FooterComponent, RegisterComponent, CartComponent, CartItemComponent, AccountInfoComponent, OrderDetailsComponent, PaymentComponent, MainSiteComponent,ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'style-quality-lounge';
}
