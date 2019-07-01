import { Injectable } from '@angular/core';
import { IUser } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/user';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IUser>(this.apiUrl);
  }
}
