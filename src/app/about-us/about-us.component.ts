import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  [x: string]: any;
 public showLoadingIndicator: boolean =false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.gettestimonialdata();
  }

  gettestimonialdata(): void{
    this.userService.gettestimonialdata().pipe().subscribe(
      (Reviewdata: any) => {
        this.contenttestimonial = Reviewdata.data;
        this.testimonial = this.contenttestimonial;
        this.showLoadingIndicator = false;
        //console.log(this.testimonial);
        //console.log(this.content);
      },
      err => {
        this.content = err.error.message;
        this.showLoadingIndicator = false;
      }
    );
  }

}
