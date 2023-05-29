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


//import { HttpClient } from '@angular/common/http';
//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.css']
//})
//export class AppComponent {
//  public forecasts?: WeatherForecast[];

//  constructor(http: HttpClient) {
//    http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
//      this.forecasts = result;
//    }, error => console.error(error));
//  }

//  title = 'angularapp';
//}

//interface WeatherForecast {
//  date: string;
//  temperatureC: number;
//  temperatureF: number;
//  summary: string;
//}
