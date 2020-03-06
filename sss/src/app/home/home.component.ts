import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TestService } from '../test.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
      this.document.getElementById("logout").style.display = "none";
      console.log("SPOTIFY STATS SITE VERSION 0.1.31");
      this.type="artists";
      this.time="short_term";
      this.updateTerm();
      this.findHome();
    }
  constructor(@Inject(DOCUMENT) private document: Document,private test: TestService, public dialog: MatDialog) { }

  artists = []; 
  tracks = [];
  topFive = [{ "image":"https://i.scdn.co/image/fec51156ed94b7ee30fbd4c7fd29b4a840e7daec"}];
  code: string;
  type: string;
  time: string;
  access_token: string;
  refresh_token: string;
  term_string: string;
  
  //#region HTTP REQUESTS
  findHome(){
    let url = this.document.location.href;
    let index = url.indexOf("?code=");
    if(index===-1){
      this.code="";
      this.document.getElementById("loading").style.display = "none";
      console.log(this.code);
      return;
    }
    index=index+6;
    this.code = url.substring(index);
    this.document.getElementById("login").style.display = "none";
    this.document.getElementById("logout").style.display = "block";
    this.document.getElementById("loading").style.display = "block";
    this.testGetToken();
  }
  testGetToken(){
    this.test.getToken(this.code).subscribe(res =>{
      let rString = JSON.stringify(res);
      let returnedValue = JSON.parse(rString);
      this.access_token = returnedValue.access_token;
      this.refresh_token = returnedValue.refresh_token;
      console.log("Access Token: "+this.access_token);
      console.log("Refresh Token: "+this.refresh_token);
      this.getArtists();
      this.document.getElementById("loading").style.display = "none";
    });
  }
  getArtists(){
    if(this.code===""){return;}
    this.document.getElementById("loading").style.display = "block";
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
      this.document.getElementById("loading").style.display = "none";
      this.document.getElementById("artistList").style.display = "block";
    });
    
  }
  getTracks(){
    if (this.code === "") { return; }
    this.document.getElementById("loading").style.display = "block";
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
      this.document.getElementById("loading").style.display = "none";
      this.document.getElementById("trackList").style.display = "block";
    });
    
  }
  //#endregion

  //#region Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openHelpDialog(): void {
    const dialogRef = this.dialog.open(HelpDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  alertLog(){
    alert("You have been logged out!");
  }
  //#endregion

  //#region Parameter help
  swapType(){
    if(this.type==="artists"){
      this.type="tracks";
      this.document.getElementById("typeIcon").innerHTML = "music_note";
      this.getTracks();
    }
    else{
      this.type="artists";
      this.document.getElementById("typeIcon").innerHTML = "record_voice_over";
      this.getArtists();
    }
    console.log(this.type);
  }
  numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  updateTime(){
    if(this.type==="artists"){this.getArtists();}
    else if(this.type="tracks"){this.getTracks();}
  }
  updateTerm(){
    switch(this.time){
      case "short_term":
        this.term_string = "Short Term (4 weeks)";
        this.document.getElementById("timeIcon").innerHTML = "arrow_right";
        break;
      case "medium_term":
        this.term_string = "Medium Term (6 months)";
        this.document.getElementById("timeIcon").innerHTML = "chevron_right";
        break;
      case "long_term":
        this.term_string = "All Time";
        this.document.getElementById("timeIcon").innerHTML = "double_arrow";
        break;
    }
  }
  toggleTime(){
    this.document.getElementById("artistList").style.display = "none";
    this.document.getElementById("trackList").style.display = "none";
    switch (this.time) {
      case "short_term":
        this.time = "medium_term";
        break;
      case "medium_term":
        this.time = "long_term";
        break;
      case "long_term":
        this.time = "short_term";
        break;
    }
    console.log(this.time);
    this.updateTime();
    this.updateTerm();
  }
  updateTopFiveShare(){
    this.topFive = [];
    let i;
    if(this.type==="artists"){
      for (i = 0; i < 5; i++){
        this.topFive[i]=this.artists[i];
        i++;
      }
    }else{
      for (i = 0; i < 5; i++) {
        this.topFive[i] = this.tracks[i];
        i++;
      }
    }
    console.log("Top Five: "+this.topFive);
  }
  //#endregion
}


//#region Dialogs
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'help-dialog',
  templateUrl: 'help.html',
})
export class HelpDialog {

  constructor(
    public dialogRef: MatDialogRef<HelpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
//#endregion
