import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  
  public showLoadingIndicator: boolean =false;
  public testimonial_length:number=0;
  public contenttestimonial:any;
  public testimonial:any;
  content:any;

  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.gettestimonialdata();
  }
  gettestimonialdata(): void{
    this.showLoadingIndicator = true;
    this.userService.gettestimonialdata().pipe().subscribe(
      (data: any) => {
        // this.contenttestimonial = data.data;
        this.testimonial = data.data;
        this.testimonial_length=data.data.length;
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
