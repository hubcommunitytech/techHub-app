import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.scss'
})
export class InfosComponent {
  constructor(
    private datePipe: DatePipe,
  ) { }

  getDate() {
    const today = new Date();
    return this.datePipe.transform(today, 'EEEE, dd/MM/yyyy', 'pt-BR');
  }
}
