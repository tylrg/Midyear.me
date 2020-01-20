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
  ngOnInit() {
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

  testGet(){
    this.test.getTest().subscribe( res => {
      console.log(res);
      console.log(res[1]);
      //let resJ = JSON.stringify(res);
      //console.log(resJ);
    });
  }


  testOwn(){
    this.test.getOwn().subscribe(res =>{
      console.log(res);
    });
  }

  testOwnPost(){
    this.test.postOwn().subscribe(res =>{
      console.log(res);
    });
  }


  //change the values for paramters
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
}