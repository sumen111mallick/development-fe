import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insertselector',
  templateUrl: './insertselector.component.html',
  styleUrls: ['./insertselector.component.css']
})
export class InsertselectorComponent implements OnInit {

  isLoggedIn = false;
  usertype;
  public showLoadingIndicator: boolean = false;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    public matDialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Create Listing');
    this.usertype = this.tokenStorage.getUser().usertype
    console.log(this.usertype)
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
      if(this.usertype != 1){
        console.log(this.isLoggedIn)
      }
      else{
        this.redirect_to_profile();
      }
    }
    else{
      this.redirect_to_login();
    }
  }


  redirect_to_profile(): void {
    window.location.href=GlobalConstants.siteURL="profile"
  }

  redirect_to_login(): void {
    window.location.href=GlobalConstants.siteURL="login"
  }

  mob_verify_check(page: string) {
    this.showLoadingIndicator = true;
    console.log(page);
    if(page == 'rent') {
      this.tokenStorage.saveReturnURL('/insertproduct-rent');
    }
    else if (page == 'sale') {
      this.tokenStorage.saveReturnURL('/insertproduct-sale');
    }
    /* To check if Mobile Number has been verified */

    this.userService.getUserPhoneDetails().subscribe(
      data => {
        console.log(data);
        if (data !== 1) {
          console.log("Mobile number not verified");
          this.openModal();
        }
        else {
          console.log("Mobile Number verified");  
          if(page == 'rent') {
            this.router.navigate(['/insertproduct-rent']).then(() => {
              window.location.reload();
            });
          }
          else if(page == 'sale') {
            this.router.navigate(['/insertproduct-sale']).then(() => {
              window.location.reload();
            });
          }
        }
        this.showLoadingIndicator = false;
      },
      err => {
        console.log(err);
        this.showLoadingIndicator = false;
      }
    );

    /* To check if Mobile Number has been verified */
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

}
