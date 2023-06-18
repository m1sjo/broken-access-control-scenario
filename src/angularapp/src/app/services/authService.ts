import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core"

@Injectable()
// This class represents the Authentication-Service
export class AuthService {

  constructor(private http: HttpClient) { }

  // Post-Request to login.
  login(username:string, password:string):Observable<any> {
    const credentials = { username, password }
    return this.http.post(`${environment.apiUrl}/Auth/login`, credentials)
  }

  // A helper function that is used to set the Authentication Token in the local storage.
  setAuthToken(token: string): void {
    localStorage.setItem("TOKEN_KEY", token);
  }

  // A helper function that is used to get the Authentication Token from the local storage.
  getAuthToken(): string | null {
    return localStorage.getItem("TOKEN_KEY");
  }

  // A helper function that is used to remove the Authentication Token from the local storage.
  removeAuthToken(): void {
    localStorage.removeItem("TOKEN_KEY");
  }

  // A helper function that is used to check if the token exists (i.e. "The user exists")
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (token == null) {
      return false;
    }

    return true
  }

}


