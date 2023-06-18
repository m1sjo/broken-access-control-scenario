import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  public homeInfo?: SmartHomeInfo;

  constructor(
    private authenticator: AuthService,
    private http: HttpClient,
    private router: Router,
    ) { }


  ngOnInit(): void {
    if(!this.authenticator.isAuthenticated()) {
      this.authenticator.removeAuthToken();

      // Redirect to login
      // ** You can implement your Logic here (e.g. messageBox) **
      this.router.navigate(['/login']);
      return;
    }

    // Get the token.
    const token = this.authenticator.getAuthToken();

    // Create the 'Authorization' header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Get the Smarthome information (and provide the new header)
    this.http.get<SmartHomeInfo>(`${environment.apiUrl}/SmartHomeInformation/GetInfo`, { headers }).subscribe(
      response => {
        this.homeInfo = response;
      },
      error => {
        this.homeInfo = undefined;
        console.log(error);
      }
    )
  }

  signOut() {
    this.authenticator.removeAuthToken();
    this.router.navigate(['/login']);
  }

  title = 'ThisIsSMARThome';
}

interface SmartHomeInfo {
  temperatur: number;
  humidity: number;
  isLightOn: boolean;
}
