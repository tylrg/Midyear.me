import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthorizeService } from '../authorize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private top: AuthorizeService) { }

  token: string;
  type: string;
  time: string;
  ngOnInit() {
    this.type="artists";
    this.time="short_term";
  }
  findHome(){
    let url = this.document.location.href;
    let index = url.indexOf("#access_token=");
    if(index===-1){
      this.token="";
      console.log(this.token);
      return;
    }
    index=index+14;
    let endIndex =url.indexOf("&token_type")
    this.token = url.substring(index,endIndex);
    this.top.setToken(this.token);
    //console.log(this.token);
  }

  


  postAndLook(){
    this.top.printToken();
    this.top.getTop(this.type,this.time).subscribe((res)=> {
      //let rJ = JSON.parse(res);
      //let rS = JSON.stringify(rJ);
      //console.log(rS);
    })
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