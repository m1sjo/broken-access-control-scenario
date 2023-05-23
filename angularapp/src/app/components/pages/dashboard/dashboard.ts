import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  public homeInfo?: SmartHomeInfo[];

  constructor(http: HttpClient) {
    http.get<SmartHomeInfo[]>('/smarthomeinfo').subscribe(result => {
      this.homeInfo = result;
    }, error => console.error(error));
  }

  title = 'ThisIsSMARThome';
}

interface SmartHomeInfo {
  temperature: number;
  humidity: number;
  lightState: boolean;
}
