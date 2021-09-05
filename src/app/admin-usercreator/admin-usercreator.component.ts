import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InternalUserService } from './../_services/internal-user.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-admin-usercreator',
  templateUrl: './admin-usercreator.component.html',
  styleUrls: ['./admin-usercreator.component.css']
})
export class AdminUsercreatorComponent implements OnInit {

  form: any = {};
  otp: any = {};
  isSuccessful = false;
  public isSignUpFailed: boolean = false;
  public errorMessage: string;
  theFile: any = null;
  fileToUpload: File = null;
  imageURL: string;
  imgLink: any
  imgData: any
  image;
  number: string
  verify = false;
  isFailedVerify = false;
  isVerified = false;
  public checkbox_status: boolean;
  public showLoadingIndicator: boolean = false;
  public response: any;
  public userForm: FormGroup;
  public item_id: number;
  public item_text: string;

  public constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private authService: AuthService,
    private internalUserService: InternalUserService,
    private toastr: ToastrService) {

  }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      phone: [''],
      address1: [''],
      address2: [''],
      password: [''],
      confirm_password: [''],
      branch: [''],
      user_role: [''],
      selectedItems: ['']
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight: 250
    };

    this.titleService.setTitle('Admin User Creator');

    this.internalUserService.get_role_details().subscribe(
      data => {
        this.response = data;
        //console.log(data);
        this.showLoadingIndicator = false;
      },
      err => {
        //console.log(err);
        this.showLoadingIndicator = false;
      }
    );

    this.internalUserService.get_areas().subscribe(
      data => {
        //this.dropdownList = data;
        //console.log(data);
        //console.log(data.length);
        for (let i = 0; i < data.length; i++) {
          //this.dropdownList[i] = "{item_id: " + i + "," + "item_text: " + "'" + data[i].area + "'}";
          //console.log(this.dropdownList[i]);
          this.dropdownList = this.dropdownList.concat({item_id: i, item_text: data[i].area});
        }
        //console.log(this.dropdownList);
      },
      err => {
        //console.log(err);

      }
    );

  }

  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  get f() {
    return this.userForm.controls;
  }

  showSuccess($text) {
    this.toastr.success($text);
  }

  onFileChanged(event) {

    this.readThis(event.target)

  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      //console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

  onSubmit() {
    this.showLoadingIndicator = true;
    //console.log("User creation Form Submitted");
    //console.log(this.userForm);
    //console.log(this.userForm.controls);
    this.authService.register_internal_user(this.userForm).subscribe(
      data => {
        //console.log(data);
        this.showLoadingIndicator = false;
        this.isSignUpFailed = false;
        this.showSuccess(data.message);
        window.location.reload();

        /* this.userForm.reset({});
         this.userForm.get('username').clearValidators();
         this.userForm.get('username').updateValueAndValidity();
 
         this.userForm.get('email').clearValidators();
         this.userForm.get('email').updateValueAndValidity();
 
         this.userForm.get('phone').clearValidators();
         this.userForm.get('phone').updateValueAndValidity();
 
         this.userForm.get('address1').clearValidators();
         this.userForm.get('address1').updateValueAndValidity();
 
         this.userForm.get('address2').clearValidators();
         this.userForm.get('address2').updateValueAndValidity();
 
         this.userForm.get('password').clearValidators();
         this.userForm.get('password').updateValueAndValidity();
 
         this.userForm.get('confirm_password').clearValidators();
         this.userForm.get('confirm_password').updateValueAndValidity();
 
         this.userForm.get('branch').clearValidators();
         this.userForm.get('branch').updateValueAndValidity();
 
         this.userForm.get('user_role').clearValidators();
         this.userForm.get('user_role').updateValueAndValidity();
 
         this.userForm.get('area_name').clearValidators();
         this.userForm.get('area_name').updateValueAndValidity();*/

      },
      err => {
        //console.log(err);
        this.errorMessage = err.error;
        this.showLoadingIndicator = false;
        this.isSignUpFailed = true;
      }
    );
  }

  getStats(checkbox_value: any, isChecked: boolean) {
    //console.log(checkbox_value);
    //console.log(isChecked);
    this.checkbox_status = isChecked;
  }

}
