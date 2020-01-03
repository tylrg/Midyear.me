import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTopService {
  baseUrl = 'https://accounts.spotify.com/authorize?client_id=f2143b027e744a7eb3dabfee5183de1e&response_type=code&redirect_uri=http://localhost:4200';
;
  constructor(private http: HttpClient) { }

  getBase() {
    return this.http.get(this.baseUrl);
  }
}
