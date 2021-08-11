import { Component, OnInit } from '@angular/core';
import { BlogService } from './../_services/blog.service';
import { BlogComponent } from './../blog/blog.component';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { GlobalConstants } from './../global-constants';

@Component({
  selector: 'app-blog-single-post',
  templateUrl: './blog-single-post.component.html',
  styleUrls: ['./blog-single-post.component.css']
})
export class BlogSinglePostComponent implements OnInit {

  activatedRouteSnapshot = '';
  errorMessage = '';
  post_detail: any = [];
  sharedMessage:string;
  showLoadingIndicator;
  images_folder: string = GlobalConstants.ftpURL;

  constructor(private _ActivatedRoute:ActivatedRoute, private _router:Router, private blogService:BlogService) { }

  ngOnInit(): void {

    this.showLoadingIndicator = true;
    this.activatedRouteSnapshot = this._ActivatedRoute.snapshot.params.slug;
    console.log(this.activatedRouteSnapshot);

    this.blogService.getPostDetails(this.activatedRouteSnapshot).subscribe(
      res => {
        
        console.log(res);
        this.post_detail = JSON.parse(res);
        console.log(this.post_detail);
        this.showLoadingIndicator = false;
        this._router.navigate(['/blog-single-post', this.activatedRouteSnapshot ]);
        //this.gotoPostDetails(BLOG_API + '/blog-single-post', this.activatedRouteSnapshot);
        //this.gotoPostDetails('/blog-single-post', this.activatedRouteSnapshot);
      },
      err => {
        this.showLoadingIndicator = false;
        this.errorMessage = err.error.message;
        console.log(err);
      }
    );

  }

  editPost(postSlug) {
    //this.blogService.setPostData(this.post_detail[0]);
    this._router.navigate(['/blog-edit-post', postSlug]);
  }

  /*public gotoPostDetails(url, id) {
    this._router.navigate([url, id]).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
        console.log(e);
        console.log("URL: " + url, "ID: " + id);
      } else {
        console.log("Navigation has failed!");
        console.log("URL: " + url, "ID: " + id);
      }
    });
  } */

}
