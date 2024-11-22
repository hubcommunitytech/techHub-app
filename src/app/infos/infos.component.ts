import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { environment } from '../../env/environment';
import { AdminService } from '../admin/admin.service';
import { AlertService } from '../util/alert.service';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [DialogModule, ButtonModule, NgIf,
    ReactiveFormsModule, PasswordModule, InputTextModule],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.scss'
})
export class InfosComponent {
  visible = false;
  private validUser = environment.USER;
  private validHash = environment.PASS_VALID;

  form: FormGroup = new FormGroup({
    user: new FormControl<string | null>(null, Validators.required),
    pass: new FormControl<string | null>(null, Validators.required),
  })

  constructor(
    private datePipe: DatePipe,
    private auth: AdminService,
    private router: Router,
    private alert: AlertService
  ) { }

  getDate() {
    const today = new Date();
    return this.datePipe.transform(today, 'EEEE, dd/MM/yyyy', 'pt-BR');
  }

  openModal() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['admin'])
    } else {
      this.visible = true;
    }
  }

  login() {
    const { user, pass } = this.form.value;
    if (this.form.valid) {
      const passHash = CryptoJS.SHA256(pass || '').toString();
      if (user === this.validUser && passHash === this.validHash) {
        this.auth.login(user);
        this.visible = false;
        this.router.navigate(['admin']);
      } else {
        this.alert.showMsg('error', 'Login', 'Verifique os dados e tente novamente');
      }
    }
  }
}