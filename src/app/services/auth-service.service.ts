import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);

  }

  login(postData: any){

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let url: string = `${environment.grantsUrl}/login`;
    
    return this.http.post<any>(url, postData, httpOptions)
      .pipe(retry(0),
        map(response => {
          return response;
        }),
        catchError(this.handleError)
      );

  }

  returnUserName(){
    return localStorage.getItem('userName');
  }

  handleError(error) {
    return throwError(error);
  }
}
