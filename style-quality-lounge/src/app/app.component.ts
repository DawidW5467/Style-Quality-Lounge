import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {LoginComponent} from './login/login.component';;
import {FooterComponent} from './footer/footer.component';
import {RegisterComponent} from './register/register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoginComponent, FooterComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'style-quality-lounge';
}
