import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ModalViewComponent } from '../util/modal-view.component';
import { Count, Project } from './items';
import { ItemsService } from './items.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  imports: [PaginatorModule, NgStyle, FormsModule, NgIf, NgFor],
  viewProviders: [DialogService]
})
export class ItemsComponent implements OnInit {
  items: Project[] = [];
  filteredItems: Project[] = [];
  totalRecords!: number;
  first: number = 0;
  rows: number = 5;
  rowsPerPageOptions = [5, 10, 25, 50];
  searchValue: string = '';
  private searchSubject = new Subject<string>();  // Usado para o debounce

  constructor(
    private service: ItemsService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    // Inicia a contagem total de itens
    this.service.getTotalItems().subscribe((data: Count) => {
      this.totalRecords = data.total;
      this.loadItems();
    });

    // Observa o termo de busca com debounce para otimizar as requisições
    this.searchSubject.pipe(
      debounceTime(500),  // Espera 500ms após o último caractere
      distinctUntilChanged(),  // Evita chamadas repetidas para o mesmo termo
      switchMap(query => {
        return this.service.searchItems(query, this.first, this.rows);
      })
    ).subscribe((data: Project[]) => {
      this.items = data;
      this.filteredItems = data;  // Filtra os itens com base no retorno da API
    });
  }

  // Chama a API de busca ao digitar no campo de busca
  onSearchChange() {
    this.searchSubject.next(this.searchValue);  // Envia o valor da busca para o observable
  }

  loadItems(): void {
    this.service.searchItems(this.searchValue, this.first, this.rows).subscribe((data: Project[]) => {
      this.items = data;
      this.filteredItems = [...this.items];
    });
  }

  onPageChange(e: any): void {
    const event = e as { first: number; rows: number };
    this.first = event.first;
    this.rows = event.rows;
    this.loadItems();
  }

  open(p: Project): void {
    this.dialogService.open(ModalViewComponent, {
      data: p,
      header: p.title,
      width: '80%',
      height: '80%',
    });
  }
}