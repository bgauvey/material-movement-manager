import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = '/api/request';

  constructor(private http: HttpClient) { }

  getRequest(rowId: number) {
    return this.http.get<IRequest>(this.apiUrl + '/' + rowId);
  }

  getByItemId(itemId: string) {
    return this.http.get<IRequest[]>(this.apiUrl + '/item/' + itemId);
  }

  get() {
    return this.http.get<IRequest[]>(this.apiUrl);
  }

  add(data: IRequest) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.apiUrl, data, httpOptions);
  }

  save(data: IRequest) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.apiUrl + '/' + data.row_id, data, httpOptions);
  }

  delete(data: IRequest) {

    return this.http.delete(this.apiUrl + '/' + data.row_id);
  }
}
