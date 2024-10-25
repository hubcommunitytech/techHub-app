import { Component } from '@angular/core';
import { InfosComponent } from "../infos/infos.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InfosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
