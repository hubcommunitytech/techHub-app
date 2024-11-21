import { Component } from '@angular/core';
import { ItemsComponent } from "../items/items.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
