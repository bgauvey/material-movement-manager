import { Injectable } from '@angular/core';
import { ITicket } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = '/api/ticket';

  constructor(private http: HttpClient) { }

  getTicket(sublotNo: string) {
    return this.http.get<ITicket>(this.apiUrl + '/' + sublotNo);
  }

}
