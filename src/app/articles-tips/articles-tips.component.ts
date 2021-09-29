import { Component, OnInit } from '@angular/core';
import { BlogService } from './../_services/blog.service';
import { PaginatedPosts } from './../paginated-posts.model';
import { GlobalConstants } from './../global-constants';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-articles-tips',
  templateUrl: './articles-tips.component.html',
  styleUrls: ['./articles-tips.component.css']
})
export class ArticlesTipsComponent implements OnInit {

  paginated_posts: PaginatedPosts;
  public showLoadingIndicator: boolean =false;
  errorMessage = '';
  response;
  public response_length:number=0;
  images_folder: string = GlobalConstants.ftpURL;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

    this.showLoadingIndicator = true;
    this.blogService.getLatestPosts().subscribe (
      res => {
        //console.log(res);
        this.response = res;
        this.response_length=this.response.length;
        this.showLoadingIndicator = false;
      },
      err => {
        this.errorMessage = err.error.message;
        //console.log(err);
        this.showLoadingIndicator = false;
      }
    )
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: true,
    navSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      480: {
        items: 1
      },
      667: {
        items: 2
      },
      1024: {
        items: 3
      }
    },
    nav: true
  }

}
