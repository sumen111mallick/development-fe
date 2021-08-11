import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  content: [];
  ftpstring: string = GlobalConstants.ftpURL;
  contentdata: any;

  constructor(
    private titleService: Title,
    private dataService: TokenStorageService,

  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Search Results');
    this.contentdata = this.dataService.returnSearch();
    this.content=this.contentdata['product'];
    console.log(this.content);
    console.log(this.contentdata['product']);
    // this.content= this.contentdata[] ;
    console.log(this.dataService.returnSearch());
  }
  prod_func(data){
    this.dataService.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }

}
