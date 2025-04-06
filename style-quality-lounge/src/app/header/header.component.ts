import { Component } from '@angular/core';

@Component({
    selector: 'app-header', // lub 'HeaderComponent' jeśli chcesz używać <HeaderComponent>
    standalone: true,  // wymagane gdy używasz imports
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    // logika komponentu
}