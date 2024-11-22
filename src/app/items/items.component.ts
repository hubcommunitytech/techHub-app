import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ModalViewComponent } from '../util/modal-view.component';
import { Count, Project } from './items';
import { ItemsService } from './items.service';
@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  imports: [PaginatorModule, NgStyle, FormsModule,
    NgIf, NgFor, SkeletonModule
  ],
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
  private searchSubject = new Subject<string>();
  skeleton: boolean = true;

  constructor(
    private service: ItemsService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.service.getTotalItems().subscribe((data: Count) => {
      this.totalRecords = data.total;
      this.loadItems();
    });

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => {
        this.skeleton = true;
        return this.service.searchItems(query, this.first, this.rows);
      })
    ).subscribe((data: Project[]) => {
      this.items = data;
      this.filteredItems = data;
      this.skeleton = false;
    });
  }


  onSearchChange() {
    this.searchSubject.next(this.searchValue);
  }

  loadItems(): void {
    this.skeleton = true;
    this.service.searchItems(this.searchValue, this.first, this.rows).subscribe((data: Project[]) => {
      this.items = data;
      this.filteredItems = [...this.items];
      this.skeleton = false;
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