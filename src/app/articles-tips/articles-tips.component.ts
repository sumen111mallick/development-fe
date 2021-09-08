import { Component, OnInit } from '@angular/core';
import { BlogService } from './../_services/blog.service';
import { PaginatedPosts } from './../paginated-posts.model';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-articles-tips',
  templateUrl: './articles-tips.component.html',
  styleUrls: ['./articles-tips.component.css']
})
export class ArticlesTipsComponent implements OnInit {

  paginated_posts: PaginatedPosts;
  showLoadingIndicator;
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
        this.showLoadingIndicator = false;
        this.response = res;
        this.response_length=this.response.length;
      },
      err => {
        this.errorMessage = err.error.message;
        //console.log(err);
        this.showLoadingIndicator = false;
      }
    )
  }

}
