import { Routes } from '@angular/router';
import { MainSiteComponent } from './main-view/main-site/main-site.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CartComponent } from './cart/cart.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './main-view/product/product.component';

export const appRoutes: Routes = [
  { path: '', component: MainSiteComponent, title: 'Strona Główna' },
  { path: 'account', component: AccountInfoComponent, title: 'Moje konto' },
  { path: 'login', component: LoginComponent, title: 'Logowanie' },
  { path: 'register', component: RegisterComponent, title: 'Rejestracja' },
  { path: 'payment', component: PaymentComponent, title: 'Finalizacja płatności' },
  { path: 'order-details', component: OrderDetailsComponent, title: 'Szczegóły zamówienia' },
  { path: 'cart', component: CartComponent, title: 'Koszyk' },
  { path: 'edit-product', component: EditProductComponent, title: 'Edytuj produktu' },
  { path: 'add-product', component: AddProductComponent, title: 'Dodaj produkt' },
  { path: 'product/:id', component: ProductComponent, title: 'Szczegóły produktu' },
  { path: '**', component: MainSiteComponent, title: 'Strona Główna' }
];
