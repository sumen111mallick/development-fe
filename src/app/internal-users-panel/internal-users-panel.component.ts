import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-internal-users-panel',
  templateUrl: './internal-users-panel.component.html',
  styleUrls: ['./internal-users-panel.component.css']
})
export class InternalUsersPanelComponent implements OnInit {

  name: string[] = [];
  view_count
  review_count
  property_count
  user
  product
  events
  showLoadingIndicator;

  constructor(
    private titleservice: Title,
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.titleservice.setTitle('Internal Users Panel')
    if (this.tokenStorage.getUser().usertype < 6)
      this.panel_check();
    this.name = this.tokenStorage.getUser().username;
    console.log(this.tokenStorage.getUser());
    this.showLoadingIndicator = false;
  }

  panel_check() {
    window.location.href = GlobalConstants.siteURL = "profile";
  }
}
