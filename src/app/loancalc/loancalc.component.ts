import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loancalc',
  templateUrl: './loancalc.component.html',
  styleUrls: ['./loancalc.component.css']
})
export class LoancalcComponent implements OnInit {

  form: any = {};
  content: any = [];


  public constructor(
    private titleService: Title,
    private authService: AuthService,
    private userService: UserService
    ) {

  }

  ngOnInit(): void {
    this.form.amount = 0
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

  assign(id): void{
    console.log(id)
    this.form.amount = 1
    this.form.apr = id
    this.form.years = 1
  }

}
