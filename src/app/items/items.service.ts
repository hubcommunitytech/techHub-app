import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Count, Project } from './items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private api = `${environment.API_URL}/items`;

  constructor(private http: HttpClient) { }

  // Obtém a lista de itens com paginação
  getData(first: number, rows: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.api}?first=${first}&rows=${rows}`);
  }

  // Obtém o número total de itens
  getTotalItems(): Observable<Count> {
    return this.http.get<Count>(`${this.api}/count`);
  }

  // Pesquisa itens por um termo, com paginação
  searchItems(query: string, first: number, rows: number): Observable<Project[]> {
    let params = new HttpParams()
      .set('query', query)
      .set('first', first.toString())
      .set('rows', rows.toString());
    return this.http.get<Project[]>(this.api, { params });
  }

  // Cria um novo item
  createItem(item: Project): Observable<Project> {
    return this.http.post<Project>(this.api, item);
  }

  // Adiciona múltiplos itens em uma única chamada
  createItemsBulk(items: Project[]): Observable<Project[]> {
    return this.http.post<Project[]>(`${this.api}/bulk`, items);
  }

  // Atualiza um item existente
  updateItem(id: string, item: Partial<Project>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, item);
  }

  // Remove um item pelo ID
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
