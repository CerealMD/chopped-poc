import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {
  url: any;

  constructor() { }

  ngOnInit(): void {
  }
  searchItem(item){
    this.url = item
   // @ts-ignore: Object is possibly 'null'.
    window.open(this.url, '_blank').focus();
  }
}
