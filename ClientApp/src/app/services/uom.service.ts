import { Injectable } from '@angular/core';
import { IUom } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UomService {
  private apiUrl = '/api/uom';

  constructor(private http: HttpClient) { }

  getUom(itemId: string) {
    return this.http.get<IUom[]>(this.apiUrl + '/' + itemId);
  }

}
