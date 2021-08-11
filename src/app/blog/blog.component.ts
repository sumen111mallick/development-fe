import { Component, OnInit } from '@angular/core';
import { BlogService } from './../_services/blog.service';
import { GlobalConstants } from './../global-constants';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PaginatedPosts } from './../paginated-posts.model';
//import { NgxSpinnerService } from 'ngx-spinner';
//import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  errorMessage = '';
  images_folder: string = GlobalConstants.ftpURL;
  paginated_posts: PaginatedPosts;
  total_pages;
  returnedPosts;
  showLoadingIndicator;


  constructor(private blogService: BlogService, private _router: Router) { }

  ngOnInit(): void {
    //this.SpinnerService.show(); 
    //this.blogService.getPosts().then(paginatedPosts=>this.paginatedPosts = paginatedPosts);
    this.showLoadingIndicator = true;
    this.blogService.getPosts().then(paginatedPosts => {
      this.paginated_posts = paginatedPosts;
      console.log(this.paginated_posts);
      console.log(this.paginated_posts.data.length);
      this.showLoadingIndicator = false;
      //this.total_pages = Math.round(this.paginated_posts.total /this.paginated_posts.per_page) ;
    });

    //setTimeout(() => {
    // this.SpinnerService.hide();
    //}, 3000); 
    //this.totalPages();

    /*this.blogService.getPost().subscribe(
      res => {
        this.posts = res;
        console.log(res);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(err);
      }
    ); */
  }

  /*  totalPages() {
      this.blogService.getPosts().then(paginatedPosts=> {
        this.total_pages = Math.round(paginatedPosts.total /paginatedPosts.per_page) ;
        console.log(this.total_pages);
      });
  
    } */

  gotoPage(link_url) {
    //this.SpinnerService.show();
    this.showLoadingIndicator = true;
    console.log(link_url);
    this.blogService.getPostsAtUrl(link_url).then(paginatedPosts => {
      this.paginated_posts = paginatedPosts;
      this.showLoadingIndicator = false;
    });

    window.scrollTo(0, 0);
    //setTimeout(() => {
    //  this.SpinnerService.hide();
    //}, 3000); 
    //this.SpinnerService.hide();  
  }

  prevPage() {
    this.blogService.getPostsAtUrl(this.paginated_posts.prev_page_url).then(paginatedPosts => this.paginated_posts = paginatedPosts);
  }

  nextPage() {
    this.blogService.getPostsAtUrl(this.paginated_posts.next_page_url).then(paginatedPosts => this.paginated_posts = paginatedPosts);
  }

  createPost($event) {
    this.showLoadingIndicator = true;
    console.log($event.target.innerHTML);
    this._router.navigate(['/blog-create-post']);
    this.showLoadingIndicator = false;
  }

  public gotoPostDetails(url, id) {
    this._router.navigate([url, id]).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
        console.log(e);
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
