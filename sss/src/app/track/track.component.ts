import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  constructor() { }
  @Input()
  number: string="";
  @Input()
  name: string= "";
  @Input()
  artist: string = "";
  @Input()
  albumName: string = "";
  @Input()
  link: string = "";
  @Input()
  albumImage: string = "";
  @Input()
  popularity: string = "";



  ngOnInit() {
  }

}
