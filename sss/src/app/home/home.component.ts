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
    let index = url.indexOf("#access_token=")+14;
    let endIndex =url.indexOf("&token_type")
    this.token = url.substring(index,endIndex);
    this.document.getElementById("tag").innerHTML=this.token;
    this.top.setToken(this.token);
  }

  other(){
    this.top.getBase().subscribe((res) => {
      console.log("FUCK");
    })
  }


  postAndLook(){
    //this.top.printToken();
    this.top.getTopArtists().subscribe((res)=> {
      console.log("Getting Artists...");
    })
  }

  
  clear(){
    console.clear();
  }


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
}