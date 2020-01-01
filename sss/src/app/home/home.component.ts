import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    let url=this.document.location.href;
    console.log(url);
    let index = url.indexOf("?code="); 
    index = index + 6;
    let code = url.substring(index);
    console.log(code);
  }

}