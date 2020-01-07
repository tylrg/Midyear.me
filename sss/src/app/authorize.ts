import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  baseUrl = 'https://accounts.spotify.com/authorize?';
  clientId ='?client_id=f2143b027e744a7eb3dabfee5183de1e';
  response_type ='&response_type=token';
  redirect_uri='&redirect_uri=http://localhost:4200';
  assembledUrl=this.baseUrl+this.clientId+this.response_type+this.redirect_uri;

  constructor(private http: HttpClient) { }

  getBase() {
    console.log(this.assembledUrl)
    return this.http.get(this.baseUrl,{responseType: 'json'});
    }

}
