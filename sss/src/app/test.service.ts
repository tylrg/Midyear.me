import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
    //'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TestService {

  //baseUrl="www.google.com";

  constructor(private http: HttpClient) { }

  add(){

  }

  getTest(){
    return this.http.get('http://localhost:3000/posts');
  }

  getOwn(){
    return this.http.get('http://localhost:8000/testJson');
  }

  postOwn(c){
    let body = {
      code: c
    };
    return this.http.post('http://localhost:8000/testPost',body,httpOptions);
  }

}
