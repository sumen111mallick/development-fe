import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './../global-constants';
import { ContactService } from './../_services/contact.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

const BLOG_API = GlobalConstants.apiURL;

@Component({
  selector: 'app-comtact-page-form',
  templateUrl: './comtact-page-form.component.html',
  styleUrls: ['./comtact-page-form.component.css']
})
export class ComtactPageFormComponent implements OnInit {

  response;
  errorMessage = '';
  public showLoadingIndicator: boolean =false;

  contactForm = this.fb.group({
    form_name: ['', Validators.required],
    form_email: ['', Validators.required],
    form_phone: ['', Validators.required],
    form_subject: ['', Validators.required],
    form_message: ['', Validators.required]
  });

  constructor(private http:HttpClient, private contactService:ContactService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log(this.contactForm.value);
    this.showLoadingIndicator = true;
    var formData: any = new FormData();
    formData.append('name', this.contactForm.value.form_name);
    formData.append('email', this.contactForm.value.form_email);
    formData.append('phone', this.contactForm.value.form_phone);
    formData.append('subject', this.contactForm.value.form_subject);
    formData.append('message', this.contactForm.value.form_message);
    this.contactService.saveContact(formData).subscribe(
      res => {
        //console.log(res);
        this.response = res;
        this.showLoadingIndicator = false;
        this.contactForm.reset({});
      },
      err => {
        this.errorMessage = err.error.message;
        this.showLoadingIndicator = false;
        //console.log(err);
      }
    );
  }
}
