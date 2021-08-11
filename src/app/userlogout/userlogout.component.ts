import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlogout',
  templateUrl: './userlogout.component.html',
  styleUrls: ['./userlogout.component.css']
})
export class UserlogoutComponent implements OnInit {


  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Logout');
    this.userService.getLogout().subscribe(
      data => {
        console.log(data);

      },
      err => {
        console.log(err);
      }
    );
    this.tokenStorage.signout();

  }


}
