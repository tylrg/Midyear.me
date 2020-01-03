import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GetTopService } from '../get-top.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private top: GetTopService) { }

  code: string;
  ngOnInit() {
  
  }

  findHome(){
    let url = this.document.location.href;
    let index = url.indexOf("?code=");
    index = index + 6;
    this.code = url.substring(index);
    this.document.getElementById("tag").innerHTML=this.code;
  }

  other(){
    console.log("Being Called other");
    this.top.getConfig()// clone the data object, using its known Config shape
      .subscribe()
  }

}