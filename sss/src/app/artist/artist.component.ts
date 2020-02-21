import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  constructor() { }

  @Input()
  name: string = "";
  @Input()
  link: string = "";
  @Input()
  image: string = "";
  @Input()
  popularity: string = "";
  @Input()
  followers: string = "";

  ngOnInit() {
  }

}
