import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  public homeInfo?: SmartHomeInfo;

  constructor(http: HttpClient, private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login'])
    }
    http.get<SmartHomeInfo>(`${environment.apiUrl}/SmartHomeInformation`).subscribe(result => {
      this.homeInfo = result;
    }, error => console.error(error));
  }

  title = 'ThisIsSMARThome';
}

interface SmartHomeInfo {
  temperatur: number;
  humidity: number;
  isLightOn: boolean;
}
