import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InfosComponent } from "./infos/infos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfosComponent, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'techhub-app';
  items = [
    { name: 'Home', icon: 'bi-house', route: 'home' },
    { name: 'Sobre', icon: 'bi-info-square', route: 'about' },
  ]
  constructor(
    private router: Router
  ) { }

  navigate(r: string) {
    this.router.navigate([r]);
  }
}
