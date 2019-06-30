import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = '/api/transfer';

  constructor(private http: HttpClient) { }

  post(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.apiUrl, data, httpOptions);
  }
}
