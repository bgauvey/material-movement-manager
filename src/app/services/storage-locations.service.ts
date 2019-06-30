import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStorageLocation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StorageLocationsService {
  private apiUrl = '/api/storagelocations';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IStorageLocation[]>(this.apiUrl);
  }
}
