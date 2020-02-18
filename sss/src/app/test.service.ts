import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TestService {

  //baseUrl="www.google.com";

  constructor(private http: HttpClient) { }

  boomerang(code){
    let body = {"Code": "Hey"};
    return this.http.post('https://peaceful-ravine-99525.herokuapp.com/boomerang',body,httpOptions);
  }

}
