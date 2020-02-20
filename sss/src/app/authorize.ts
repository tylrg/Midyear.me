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
  // response_type ='&response_type=code';
  // redirect_uri='&redirect_uri=http://localhost:4200';
  // assembledUrl=this.baseUrl+this.clientId+this.response_type+this.redirect_uri;

  code = "";
  // topUrl="https://api.spotify.com/v1/me/top/";
  // query="?limit=50&time_limit=";

  

  constructor(private http: HttpClient) { }
  setCode(s){
    this.code=s;
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer {'+this.code+"}");
      console.log(this.code);
  }

  printCode(){
    console.log(this.code);
  }

}
