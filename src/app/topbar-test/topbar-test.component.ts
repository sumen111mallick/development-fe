import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-topbar-test',
  templateUrl: './topbar-test.component.html',
  styleUrls: ['./topbar-test.component.css']
})
export class TopbarTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav() : void {
    $("#mySidenav").width = "250px";
    $("#main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  closeNav() {
    $("#mySidenav").width = "0";
    $("#main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

}
