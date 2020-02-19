import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthorizeService } from '../authorize';
import { TestService } from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private top: AuthorizeService, private test: TestService) { }

  code: string;
  type: string;
  time: string;
  access_token: string;
  refresh_token: string;
  ngOnInit() {
    console.log("SPOTIFY STATS SITE VERSION 0.0.13");
    this.type="artists";
    this.time="short_term";
  }
  findHome(){
    let url = this.document.location.href;
    let index = url.indexOf("?code=");
    if(index===-1){
      this.code="";
      console.log(this.code);
      return;
    }
    index=index+6;
    this.code = url.substring(index);
    this.top.setCode(this.code);
  }

  postAndLook(){
    this.top.printCode();
  }

  testOwnPost(){
    this.test.boomerang(this.code).subscribe(res =>{
      console.log(res);
    });
  }

  testGetToken(){
    this.test.getToken(this.code).subscribe(res =>{
      console.log(res);
      let rString = JSON.stringify(res);
      let returnedValue = JSON.parse(rString);
      this.access_token = returnedValue.access_token;
      this.refresh_token = returnedValue.refresh_token;
      console.log("Access Token: "+this.access_token);
      console.log("Refresh Token: "+this.refresh_token);
    });
  }

  getArtistTest(){
    this.test.getTest(this.access_token,this.type,this.time).subscribe(res =>{
      console.log(res);
    });
  }
  //change the values for paramters
  //#region Time and other params
  swapType(){
    if(this.type==="artists"){this.type="tracks";}
    else{this.type="artists";}
    console.log(this.type);
  }
  setShort(){
    this.time="short_term";
    console.log(this.time);
  }
  setMedium(){
    this.time="medium_term";
    console.log(this.time);
  }
  setLong(){
    this.time="long_term";
    console.log(this.time);
  }
  clear(){
    console.clear();
  }
  //#endregion
}