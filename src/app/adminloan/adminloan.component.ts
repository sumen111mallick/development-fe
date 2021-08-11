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

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private userService: UserService,
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Loan Control');
    this.usertype = this.tokenService.getUser().usertype;

    this.userService.getLoans().pipe().subscribe(
      (data: any) => {

        this.content = data.data;
        console.log(data.data);

      },
      err => {
        console.log(err)
      }
    )

  }

  del_func(id): void{
    {this.authService.admin_loan_delete(id).subscribe(
        data => {
          console.log(data)
          window.location.href=GlobalConstants.siteURL+"adminloan"
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  onSubmit(): void {
      console.log(this.form)
      this.authService.admin_loans(this.form).subscribe(
        data => {
          console.log(data)
          window.location.href=GlobalConstants.siteURL+"adminloan"
        },
        err => {
          console.log(err.error);
        }
      );
  }

}
