import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  [x: string]: any;
  public showLoadingIndicator: boolean =false;

  constructor(private userService: UserService ) {
    }

  ngOnInit(): void {
    this.gettestimonialdata();
  }

  gettestimonialdata(): void{
    this.showLoadingIndicator = true;
    this.userService.gettestimonialdata().pipe().subscribe(
      (Reviewdata: any) => {
        this.contenttestimonial = Reviewdata.data;
        this.testimonial = this.contenttestimonial;
        this.showLoadingIndicator = false;
        //console.log(this.testimonial);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.showLoadingIndicator = false;
      }
    );
  }
}
