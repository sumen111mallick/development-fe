import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  slidervalue = "30";
  public ticks: Object = {
placement: 'Before',
largeStep: 20,
smallStep: 5,
showSmallTicks: true
  };
}
