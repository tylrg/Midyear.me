import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

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

}