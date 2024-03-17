import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-fetch-data',
  standalone: true,
  imports: [],
  templateUrl: './fetch-data.component.html',
  styleUrl: './fetch-data.component.scss'
})
export class FetchDataComponent {
  public forecasts?: WeatherForecast[];
  constructor(http: HttpClient) {
    http.get<WeatherForecast[]>(environment.baseUrl + "api/weatherforecast").subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}
