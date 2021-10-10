import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  [x: string]: any;
  currentUser: any;
  currentUserid: any;
  form: any = {};
  data: any;
  content:any;
  public showLoadingIndicator: boolean =false;
  e: any={};


  public constructor(
    private titleService: Title,
    private tokenService: TokenStorageService,
    private tokenStorage: TokenStorageService,
    
  ){  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null){
      this.titleService.setTitle('Housing Street');
      this.currentUser = this.tokenService.getUser().username;
      this.currentUserid = this.tokenService.getUser().id;
      this.login = this.tokenService.getToken();
    }
  }
}
