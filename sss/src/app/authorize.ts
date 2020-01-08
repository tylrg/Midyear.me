import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer {}',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  // baseUrl = 'https://accounts.spotify.com/authorize?';
  // clientId ='?client_id=f2143b027e744a7eb3dabfee5183de1e';
  // response_type ='&response_type=token';
  // redirect_uri='&redirect_uri=http://localhost:4200';
  // assembledUrl=this.baseUrl+this.clientId+this.response_type+this.redirect_uri;

  token = "";
  topUrl="https://api.spotify.com/v1/me/top/";
  query="?limit=50&time_limit=";

  

  constructor(private http: HttpClient) { }
  setToken(s){
    this.token=s;
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer {'+this.token+);
  }

  printToken(){
    console.log(this.token);
  }

  getTop(searchType,searchTerm){
    let assembledUrl = this.topUrl+searchType+this.query+searchTerm;
    console.log(assembledUrl);
    return this.http.get(assembledUrl,httpOptions);
  }

}
