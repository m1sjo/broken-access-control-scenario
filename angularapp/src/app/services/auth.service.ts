import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Post-Request to login.
  login(username:string, password:string):Observable<any> {
    const credentials = { username, password }
    return this.http.post(`${environment.apiUrl}/LoginData`, credentials)
    }

  saveToken(token : string){
    localStorage.setItem('token', token);
  }

  isLoggedIn() : boolean{
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token') != null
  }
}
