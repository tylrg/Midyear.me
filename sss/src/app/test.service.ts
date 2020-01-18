import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  baseUrl="www.google.com";

  constructor(private http: HttpClient) { }

  add(){

  }

  getTest(){
    return this.http.get('http://localhost:3000/posts');
  }

  getOwn(){
    return this.http.get('http://localhost:8000/testJson');
  }

}
