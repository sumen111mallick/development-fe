import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-admingetreviews',
  templateUrl: './admingetreviews.component.html',
  styleUrls: ['./admingetreviews.component.css']
})
export class AdmingetreviewsComponent implements OnInit {

  content: [];
  ftpstring: string = GlobalConstants.ftpURL;
  usertype;

  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('My Properties');
    this.usertype = this.tokenStorage.getUser().usertype;

    this.userService.admin_get_review().pipe().subscribe(
      (data: any) => {

        this.content = data.data;
        console.log(data);

      },
      err => {
        console.log(err)
      }
    )

  }

  del_func(id){

    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed == true) {
          this.authService.review_delete(id).subscribe(
            data => {
              console.log(data);
              window.location.reload();
            },
            err => {
              console.log(err)
            }
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    
    
  }

  onShare(event){
    console.log(event);
    //window.location.href=GlobalConstants.siteURL+"productpage" + "?id=" + event;
    window.location.href=GlobalConstants.siteURL+"productpage" + "/" + event;
    // alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id);
  }

  prod_func(data){
    this.tokenStorage.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }

}
