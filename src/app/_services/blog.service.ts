import { BlogSinglePostComponent } from './../blog-single-post/blog-single-post.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from './../global-constants';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { PaginatedPosts } from './../paginated-posts.model';


const BLOG_API = GlobalConstants.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

var form_title;
var form_desc;
var form_image;

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  postForm: FormGroup;
  id: '';
  private data;
  private postUrl: string = BLOG_API + 'posts';

  constructor(private http: HttpClient) { }

  getPosts(): Promise<PaginatedPosts> {
    return this.http.get(this.postUrl, httpOptions)
      .toPromise()
      .then((response) => {
        console.log(response);
        return response as PaginatedPosts
      })
      .catch(this.handleError);
      
  }

  getPostsAtUrl(url: string): Promise<PaginatedPosts> {
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        return response as PaginatedPosts
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  addPost(postdata): Observable<any> {
    console.log(postdata.get('postImage').name);
    console.log(postdata.get('postImage').type);
    console.log(postdata.get('title'));
    console.log(postdata.get('description'));
    form_title = postdata.get('title');
    form_desc = postdata.get('description');
    form_image = postdata.get('postImage').name;
    //console.log("Title: " + postdata.value['title']);
    //console.log("Description: " + postdata.value.description);
    //console.log("Image: " + postdata.value.postImage);
    return this.http.post(BLOG_API + 'posts', postdata);
  }

  getPost(): Observable<any> {
    return this.http.get(BLOG_API + 'posts', httpOptions);
  }

  getLatestPosts() {
    return this.http.get(BLOG_API + 'posts_latest', httpOptions);
  }

  getPostDetails($slug) {
    return this.http.get(BLOG_API + 'posts/' + $slug, { responseType: "text" });
  }

  updatePostDetails(updatePostData, $slug) {
    return this.http.post(BLOG_API + 'posts/update/' + $slug, updatePostData);
  }

  deletePost($slug) {
    return this.http.delete(BLOG_API + 'posts/delete/' + $slug);
  }

  /*setPostData(details) {
    this.data = details;
  }

  getPostData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  } */


}
