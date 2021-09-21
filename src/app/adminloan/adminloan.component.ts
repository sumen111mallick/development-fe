import { Title } from '@angular/platform-browser';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminloan',
  templateUrl: './adminloan.component.html',
  styleUrls: ['./adminloan.component.css']
})
export class AdminloanComponent implements OnInit {

  usertype: number;
  content;
  form: any = {};
  public showLoadingIndicator: boolean =false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.title.setTitle('Loan Control');
    this.usertype = this.tokenService.getUser().usertype;

    this.userService.getLoans().pipe().subscribe(
      (data: any) => {

        this.content = data.data;
        this.showLoadingIndicator = false;
        //console.log(data.data);

      },
      err => {
        //console.log(err)
        this.showLoadingIndicator = false;
      }
    )

  }

  del_func(id): void{
    this.showLoadingIndicator = true;
    {this.authService.admin_loan_delete(id).subscribe(
        data => {
          //console.log(data)
          this.showLoadingIndicator = false;
          window.location.href=GlobalConstants.siteURL+"adminloan"
        },
        err => {
          //console.log(err)
          this.showLoadingIndicator = false;
        }
      )
    }
  }

  onSubmit(): void {
      //console.log(this.form)
      this.showLoadingIndicator = true;
      this.authService.admin_loans(this.form).subscribe(
        data => {
          //console.log(data)
          this.showLoadingIndicator = false;
          window.location.href=GlobalConstants.siteURL+"adminloan"
        },
        err => {
          //console.log(err.error);
          this.showLoadingIndicator = false;
        }
      );
  }

}
