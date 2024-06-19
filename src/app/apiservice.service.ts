import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}
  // connect frontend to backend
  apiUrl = 'http://localhost:3000/user';
  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }
  // create data
  createData(data: any): Observable<any> {
    console.log('createApi==>', data);
    return this._http.post(`${this.apiUrl}`, data);
  }

  // update Data
  updateData(data: any, id: any): Observable<any> {
    console.log('id to edit:', id);
    let editId = id;
    return this._http.put(`${this.apiUrl}/${editId}`, data);
  }

  // Delete Data
  deleteData(id: any): Observable<any> {
    console.log('id to delete:', id);
    const deleteId = id;
    const url = `${this.apiUrl}/${deleteId}`;
    console.log('Delete URL:', url);
    return this._http.delete(url);
  }
  // get single data
  getSingleData(id: any): Observable<any> {
    let ids = id;
    console.log('id', ids);
    return this._http.get(`${this.apiUrl}/${ids}`);
  }
}
