import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private api = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.api}/items`);
  }

}
