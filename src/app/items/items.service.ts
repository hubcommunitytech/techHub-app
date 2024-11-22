import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  searchItems(query: string, first: number, rows: number): Observable<Project[]> {
    let params = new HttpParams()
      .set('query', query)
      .set('first', first.toString())
      .set('rows', rows.toString());

    return this.http.get<Project[]>(`${this.api}/items`, { params });
  }

}
