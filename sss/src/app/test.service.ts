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
    let body = {"Code": code};
    return this.http.post('https://peaceful-ravine-99525.herokuapp.com/boomerang',body,httpOptions);
  }

  getToken(code){
    let body = {"Code": code};
    return this.http.post('https://peaceful-ravine-99525.herokuapp.com/token', body, httpOptions);
  }


  getInfoAPI(access,type,time){
    const getHeaders = {
      headers: new HttpHeaders({
        'Authorization': "Bearer "+access,
      })
    };
    let limit='?limit=50';
    let timeString='&time_range='+time;
    return this.http.get('https://api.spotify.com/v1/me/top/'+type+limit+timeString,getHeaders)
  }

}
