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
  ngOnInit() {
  
  }

  findHome(){
    let url = this.document.location.href;
    let index = url.indexOf("#access_token=");
    index = index + 14;
    let endIndex =url.indexOf("&token_type")
    this.token = url.substring(index,endIndex);
    this.document.getElementById("tag").innerHTML=this.token;
  }

  other(){
    this.top.getBase().subscribe((res) => {
      let resSTR=JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log("JSON RESPONSE:")
      console.log(resJSON);
    })
  }


  
  clear(){
    console.clear();
  }
}