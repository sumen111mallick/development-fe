import { Component} from '@angular/core';
import { Router } from '@angular/router';
// import { filter } from 'rxjs/operators';
import { UrlService } from './_services/url.service';
// , VERSION, OnInit 111111111111
// , NavigationEnd 222

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

  previousUrl: string = null;
  currentUrl: string = null;

  constructor(private router: Router,
    private urlService: UrlService) { }

    ngOnInit() {
      /*this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.urlService.setPreviousUrl(this.previousUrl);
      }); */
    }
}
