import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
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
  imports: [PaginatorModule, NgStyle],
  viewProviders: [DialogService]
})
export class ItemsComponent implements OnInit {
  items: Project[] = [];
  totalRecords!: number;
  first: number = 0;
  rows: number = 5;
  rowsPerPageOptions = [5, 10, 25, 50];

  constructor(
    private service: ItemsService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.service.getTotalItems()
      .subscribe((data: Count) => {
        this.totalRecords = data.total;
        this.loadItems();
      });
  }

  loadItems() {
    this.service.getData(this.first, this.rows)
      .subscribe((data: Project[]) => {
        this.items = data;
      });
  }

  onPageChange(e: unknown) {
    const event = e as PageEvent;
    this.first = event.first;
    this.rows = event.rows;
    this.loadItems();
  }

  open(p: Project) {
    this.dialogService.open(ModalViewComponent, {
      data: p,
      header: p.title,
      width: '80%',
      height: '80%',
    });
  }
}