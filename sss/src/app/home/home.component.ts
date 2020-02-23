import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthorizeService } from '../authorize';
import { TestService } from '../test.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
      this.document.getElementById("logout").style.display = "none";
      console.log("SPOTIFY STATS SITE VERSION 0.0.81");
      this.type="artists";
      this.time="short_term";
      this.findHome();
    }
  constructor(@Inject(DOCUMENT) private document: Document, private top: AuthorizeService, private test: TestService) { }

  artists = []; 
  tracks = [];

  code: string;
  type: string;
  time: string;
  access_token: string;
  refresh_token: string;
  
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
    this.document.getElementById("login").style.display = "none";
    this.document.getElementById("logout").style.display = "block";
    this.testGetToken();
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
      let rString = JSON.stringify(res);
      let returnedValue = JSON.parse(rString);
      this.access_token = returnedValue.access_token;
      this.refresh_token = returnedValue.refresh_token;
      console.log("Access Token: "+this.access_token);
      console.log("Refresh Token: "+this.refresh_token);
    });
  }

  getArtists(){
    this.artists = [];
    this.type="artists";
    this.document.getElementById("trackList").style.display = "none";
    this.test.getInfoAPI(this.access_token,this.type,this.time).subscribe(res =>{
      let o = JSON.stringify(res);
      let resList = JSON.parse(o);
      let iter = resList.items;
      let i = 1;
      for (let x of iter){
        let artist = { "number":i+".","name": x.name, "link": x.external_urls.spotify, "image": x.images[0], "popularity": x.popularity, "followers": this.numberWithCommas(x.followers.total) }; 
        this.artists.push(artist);
        i++;
      }
      console.log(this.artists);
    });
    this.document.getElementById("artistList").style.display = "block";
  }

  getTracks(){
    this.tracks = [];
    this.type="tracks";
    this.document.getElementById("artistList").style.display = "none";
    this.test.getInfoAPI(this.access_token, this.type, this.time).subscribe(res => {
      //console.log(res);
      let o = JSON.stringify(res);
      let resList = JSON.parse(o);
      let iter = resList.items;
      let i = 1;
      for (let x of iter) {
        let track = { "number": i + ".","name": x.name, "artists": x.artists[0].name, "albumName":x.album.name, "albumImage": x.album.images[0], "link": x.external_urls.spotify, "popularity": x.popularity };
        this.tracks.push(track);
        i++;
        //console.log(x);
      }
      console.log(this.tracks);
    });
    this.document.getElementById("trackList").style.display = "block";
    
  }


  //change the values for paramters
  //#region Time and other params
  // openSnackBar(message: string, action:string){
  //   this._snackBar.open(message,action,{
  //     duration: 1000,
  //   });
  // }
  swapType(){
    if(this.type==="artists"){this.type="tracks";}
    else{this.type="artists";}
    console.log(this.type);
  }
  numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  setShort(){
    this.time="short_term";
    console.log(this.time);
    this.updateTime();
  }
  setMedium(){
    this.time="medium_term";
    console.log(this.time);
    this.updateTime();
  }
  setLong(){
    this.time="long_term";
    console.log(this.time);
    this.updateTime();
  }
  updateTime(){
    if(this.type==="artists"){this.getArtists();}
    else if(this.type="tracks"){this.getTracks();}
  }
  clear(){
    console.clear();
  }
  //#endregion
}