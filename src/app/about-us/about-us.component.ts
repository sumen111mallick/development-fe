import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  [x: string]: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.gettestimonialdata();
  }

  gettestimonialdata(): void{
    this.userService.gettestimonialdata().pipe().subscribe(
      (Reviewdata: any) => {
        this.contenttestimonial = Reviewdata.data;
        this.testimonial = this.contenttestimonial;
        console.log(this.testimonial);
        //console.log(this.content);
      },
      err => {
        this.content = err.error.message;
      }
    );
  }

}
