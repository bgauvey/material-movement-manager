import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = '/api/items';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IItem>(this.apiUrl);
  }

  getItem(itemId: string) {
    return this.http.get<IItem>(this.apiUrl + '/' + itemId);
  }
}
