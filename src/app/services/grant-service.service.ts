import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrantService {
  
  url: string = `${environment.grantsUrl}`;

  constructor(private http: HttpClient,) { }

  setHeaders(){
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAllGrants(): Observable<any>{
    return this.http.get(`${this.url}/grants`, {headers: this.setHeaders()});
  }

  createGrant(grant: any): Observable<any>{
    return this.http.post(`${this.url}/grants`,grant, {headers: this.setHeaders()});
  }

  editGrant(payload: any, id: number): Observable<any> {
    return this.http.put(`${this.url}/grants/${id}`, payload, {headers: this.setHeaders()});
  }

  deleteGrant(id:number): Observable<any> {
    return this.http.delete(`${this.url}/grants/${id}`, {headers: this.setHeaders()});
  }
}
