import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  baseUrl = 'https://accounts.spotify.com/authorize?';
  clientId ='?client_id=f2143b027e744a7eb3dabfee5183de1e';
  response_type ='&response_type=token';
  redirect_uri='&redirect_uri=http://localhost:4200';
  assembledUrl=this.baseUrl+this.clientId+this.response_type+this.redirect_uri;

  token = "";
  topUrl="https://api.spotify.com/v1/me/top/artists?limit=50&time_limit=long_term";


  constructor(private http: HttpClient) { }

  getBase() {
    return this.http.get(this.baseUrl,{responseType: 'json'});
    }

  setToken(s){
    this.token=s;
  }

  printToken(){
    console.log(this.token);
  }

  getTopArtists(){
    return this.http.get(this.topUrl,{responseType: 'json'});

  }

}
