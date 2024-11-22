import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { AdminService } from './admin/admin.service';
import { InfosComponent } from './infos/infos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfosComponent, ToastModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'techhub-app';
  items = [
    { name: 'Home', icon: 'bi-house', route: 'home' },
    { name: 'Sobre', icon: 'bi-info-square', route: 'about' },
  ];
  private authSubscription?: Subscription;

  constructor(private router: Router, private auth: AdminService) { }

  navigate(r: string) {
    if (r === 'logout') {
      this.auth.logout();
      this.router.navigate(['']);
    } else {
      this.router.navigate([r]);
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.updateMenu(isAuthenticated);
    });
  }

  private updateMenu(isAuthenticated: boolean): void {
    const logoutIndex = this.items.findIndex(item => item.route === 'logout');
    const projectIndex = this.items.findIndex(item => item.route === 'admin');

    if (isAuthenticated) {
      if (logoutIndex === -1) {
        this.items.push({ name: 'Projetos', icon: 'bi-card-list', route: 'admin' });
        this.items.push({ name: 'Sair', icon: 'bi-arrow-left-square', route: 'logout' });
      }
    } else {
      if (logoutIndex !== -1) {
        this.items.splice(logoutIndex, 1);
      }
      if (projectIndex !== -1) {
        this.items.splice(projectIndex, 1);
      }
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
