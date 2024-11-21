import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  imports: [NgFor, NgIf]
})
export class ItemsComponent implements OnInit {
  items: any[] = [];

  constructor(private service: ItemsService) { }

  ngOnInit(): void {
    this.service.getData().subscribe((data: any) => {
      this.items = data;
      console.log(this.items);
    });
  }
}
