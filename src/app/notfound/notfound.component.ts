import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  public constructor(private titleService: Title ) {
   }
  ngOnInit(): void {
    this.titleService.setTitle('404 Not Found');

  }

}
