import { Component, OnInit } from '@angular/core';
import { BlogService } from './../_services/blog.service';
import { GlobalConstants } from './../global-constants';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from './../_services/token-storage.service';

import { PaginatedPosts } from './../paginated-posts.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {

  errorMessage = '';
  images_folder: string = GlobalConstants.ftpURL;
  paginated_posts: PaginatedPosts;
  total_pages;
  returnedPosts;
  response;
  showLoadingIndicator;
  closeResult: string;
  isLoggedIn = false;

  constructor(private blogService: BlogService,
    private _router: Router,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.showLoadingIndicator = true;
    this.blogService.getPosts().then(paginatedPosts => {
      this.paginated_posts = paginatedPosts;
      console.log(this.paginated_posts);
      this.showLoadingIndicator = false;
      //this.total_pages = Math.round(this.paginated_posts.total /this.paginated_posts.per_page) ;
    });
    /*if (this.tokenStorage.getUser() != null) {
      this.isLoggedIn = true
      console.log(this.isLoggedIn);
      if (this.tokenStorage.getUser().usertype < 6) {
        console.log(this.tokenStorage.getUser().usertype);
        window.location.href = GlobalConstants.siteURL = "blog";
      }
      else {
        this.showLoadingIndicator = true;
        this.blogService.getPosts().then(paginatedPosts => {
          this.paginated_posts = paginatedPosts;
          console.log(this.paginated_posts);
          this.showLoadingIndicator = false;
          //this.total_pages = Math.round(this.paginated_posts.total /this.paginated_posts.per_page) ;
        });
      }
    }
    else {
      this.isLoggedIn = false;
      window.location.href = GlobalConstants.siteURL = "login";
    } */



  }

  public openConfirmationDialog(slug_post) {
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed == true) {
          this.deleteBlog(slug_post);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showSuccess($text) {
    this.toastr.success($text);
  }

  gotoPage(link_url) {
    this.showLoadingIndicator = true;
    console.log(link_url);
    this.blogService.getPostsAtUrl(link_url).then(paginatedPosts => {
      this.paginated_posts = paginatedPosts;
      this.showLoadingIndicator = false;
    });
    window.scrollTo(0, 0);
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
    this._router.navigate(['/blog-create-post']).then(() => {
      window.location.reload();
      this.showLoadingIndicator = false;
    });
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

  deleteBlog(post_slug) {
    this.showLoadingIndicator = true;
    this.blogService.deletePost(post_slug).subscribe(
      res => {
        console.log(res);
        this.response = res;
        console.log(this.response);
        this.blogService.getPosts().then(paginatedPosts => {
          this.paginated_posts = paginatedPosts;
          console.log(this.paginated_posts);
          this.showLoadingIndicator = false;
          this.showSuccess(this.response.message);
          //this.total_pages = Math.round(this.paginated_posts.total /this.paginated_posts.per_page) ;
        });
      },
      err => {
        this.showLoadingIndicator = false;
        this.errorMessage = err.error.message;
        console.log(err);
      }
    );
  }
}
