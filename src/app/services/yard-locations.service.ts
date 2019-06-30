import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IYardLocation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class YardLocationsService {
  private apiUrl = '/api/yardlocations';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IYardLocation>(this.apiUrl);
  }

  add(data: IYardLocation) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.apiUrl, data, httpOptions);
  }

  save(data: IYardLocation) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.apiUrl + '/' + data.row_id, data, httpOptions);
  }

  delete(data: IYardLocation) {

    return this.http.delete(this.apiUrl + '/' + data.row_id);
  }
}
