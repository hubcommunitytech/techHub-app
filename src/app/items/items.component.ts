import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
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
  imports: [PaginatorModule]
})
export class ItemsComponent implements OnInit {
  items: Project[] = [];
  totalRecords!: number;
  first: number = 0;
  rows: number = 10;
  rowsPerPageOptions = [5, 10, 25, 50];

  constructor(private service: ItemsService) { }

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
}