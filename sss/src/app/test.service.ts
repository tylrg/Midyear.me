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

}
