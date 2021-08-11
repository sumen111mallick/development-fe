import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BlogService } from './../_services/blog.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';

import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-create-post',
  templateUrl: './blog-create-post.component.html',
  styleUrls: ['./blog-create-post.component.css']
})
export class BlogCreatePostComponent implements OnInit {

  form: any = {};
  UserToken;
  errorMessage = '';
  image;
  selectedFile: any = null;
  title: null;
  description = null;
  parsedData: any = {};
  isAddMode: boolean;
  slug: string;
  response;
  showLoadingIndicator;
  categories = [
    {id: 1, name: "Construction"},
    {id: 2, name: "Real Estate"},
    {id: 3, name: "Luxury"},
    {id: 4, name: "Loans"}
  ];
  
  blogForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    postImage: [null],
    category: [null, Validators.required]
  });

  /*blogEditForm = this.fb.group({
    edit_title: ['', Validators.required],
    edit_description: ['', Validators.required],
    postImage: [null]
  }); */

  constructor(private fb: FormBuilder,
    private blogService: BlogService, private route: ActivatedRoute,
    private toastr: ToastrService, private tokenStorage: TokenStorageService) { }

  get f() {
    return this.blogForm.controls;
  }

  ngOnInit(): void {

    this.showLoadingIndicator = true;
    this.UserToken = this.tokenStorage.getUser();
    console.log(this.UserToken);

    this.route.paramMap.subscribe(params => {
      const slugPost = params.get('slug');
      this.isAddMode = !slugPost;
      console.log(this.isAddMode);
      this.showLoadingIndicator = false;
      if (slugPost) {
        this.getSelectedPost(slugPost);
      }
    });
  }

  showSuccess($text) {
    this.toastr.success($text);
  }

  getSelectedPost(slug) {
    this.blogService.getPostDetails(slug).subscribe(
      (returnedPost) => this.editPost(returnedPost),
      (err: any) => console.log(err)
    );
  }

  editPost(returnedPost) {
    console.log(returnedPost);
    this.parsedData = JSON.parse(returnedPost);
    console.log(this.parsedData);
    this.blogForm.patchValue({
      title: this.parsedData[0].title,
      description: this.parsedData[0].description,
      postImage: this.parsedData[0].image_path,
      category: this.parsedData[0].category
    });
  }

  onFileChange(event) {

    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    /*if (event.target.files && event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      console.log(file);
      this.blogForm.get('post_image').patchValue(file);
      console.log(this.blogForm.get('post_image').value);*/
  }

  onSubmit(): void {
    if (this.isAddMode) {
      this.createPost();
    } else {
      this.updatePost();
    }

  }

  private createPost() {
    this.showLoadingIndicator = true;
    // TODO: Use EventEmitter with form value
    console.warn(this.blogForm.value);
    //var formData = new FormData();
    var formData: any = new FormData();
    formData.append('title', this.blogForm.value.title);
    formData.append('description', this.blogForm.value.description);
    formData.append('postImage', this.selectedFile, this.selectedFile.name);
    formData.append('category', this.blogForm.value.category);
    formData.append('created_by', this.UserToken.id);

    //formData.append('postImage', this.selectedFile, this.selectedFile.name);
    //formData.append('postImage', this.selectedFile.type, this.selectedFile.name);
    console.log(formData.get('postImage'));
    console.log(formData.get('title'));
    console.log(formData.get('description'));
    console.log(formData.get('category'));
    console.log(formData.get('created_by'));
    //this.blogForm.patchValue({postImage: this.selectedFile.name});
    //this.blogForm.patchValue({postImage: this.selectedFile.name});
    this.blogService.addPost(formData).subscribe(
      res => {
        console.log(res);
        this.response = res;
        this.showSuccess(this.response.message);
        this.blogForm.reset({});
        this.showLoadingIndicator = false;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(err);
        this.showLoadingIndicator = false;
      }
    );
  }

  private updatePost() {
    this.showLoadingIndicator = true;
    console.log("Hello. This is Update Operation.");
    var updateFormData: any = new FormData();
    this.slug = this.route.snapshot.params['slug'];
    console.log(this.slug);
    updateFormData.append('title', this.blogForm.value.title);
    updateFormData.append('description', this.blogForm.value.description);
    updateFormData.append('postImage', this.selectedFile, this.selectedFile.name);
    updateFormData.append('category', this.blogForm.value.category);
    updateFormData.append('created_by', this.UserToken.id);

    console.log(updateFormData.get('postImage'));
    console.log(updateFormData.get('title'));
    console.log(updateFormData.get('description'));
    console.log(updateFormData.get('category'));
    console.log(updateFormData.get('created_by'));

    this.blogService.updatePostDetails(updateFormData, this.slug).subscribe(
      res => {
        console.log(res);
        this.response = res;
        this.showSuccess(this.response.message);
        this.blogForm.reset({});
        this.showLoadingIndicator = false;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(err);
        this.showLoadingIndicator = false;
      }
    );
  }

}
