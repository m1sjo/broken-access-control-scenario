import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  public homeInfo?: SmartHomeInfo;

  constructor(http: HttpClient) {
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
