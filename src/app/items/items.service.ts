import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Count, Project } from './items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private api = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getData(first: number, rows: number) {
    return this.http.get<Project[]>(`${this.api}/items?first=${first}&rows=${rows}`);
  }

  getTotalItems() {
    return this.http.get<Count>(`${this.api}/items/count`);
  }
}
