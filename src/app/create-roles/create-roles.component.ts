import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InternalUserService } from './../_services/internal-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.css']
})
export class CreateRolesComponent implements OnInit {

  form: any = {};
  otp: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
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
  public isAddMode: boolean;
  parsedData: any = {};
  public id: string;
  private response: any;

  private all_usersControl_value: boolean;
  private propertiesControl_value: boolean;
  private blogControl_value: boolean;
  private roleControl_value: boolean;
  //private requirementsControl_value: boolean;
  private reviewsControl_value: boolean;
  private lawyerControl_value: boolean;
  private loanControl_value: boolean;
  private user_creatorControl_value: boolean;
  private listPropertyControl_value: boolean;

  private all_usersControl_update_value: number;
  private propertiesControl_update_value: number;
  private blogControl_update_value: number;
  private roleControl_update_value: number;
  //private requirementsControl_update_value: number;
  private reviewsControl_update_value: number;
  private lawyerControl_update_value: number;
  private loanControl_update_value: number;
  private user_creatorControl_update_value: number;
  private listPropertyControl_update_value: number;

  roleForm = this.fb.group({
    rolename: [''],
    role_id: [''],
    all_usersControl: [false],
    propertiesControl: [false],
    blogControl: [false],
    roleControl: [false],
    //requirementsControl: [false],
    reviewsControl: [false],
    lawyerControl: [false],
    loanControl: [false],
    user_creatorControl: [false],
    listPropertyControl: [false]
  });

  constructor(private fb: FormBuilder,
    private titleService: Title,
    private authService: AuthService,
    private route: ActivatedRoute,
    private internalUserService: InternalUserService,
    private toastr: ToastrService,
    private _router: Router) { }

  get f() {
    return this.roleForm.controls;
  }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.titleService.setTitle('Create Roles');

    this.route.paramMap.subscribe(params => {
      const roleid = params.get('id');
      this.isAddMode = !roleid;
      //console.log(this.isAddMode);
      this.showLoadingIndicator = false;
      if (roleid) {
        this.getSelectedRole(roleid);
      }
    });
  }

  showSuccess($text) {
    this.toastr.success($text);
  }

  getSelectedRole(id) {
    this.internalUserService.get_role(id).subscribe(
      (data) => this.editRole(data),
      (err: any) => console.log(err)
    );
  }

  editRole(returnedData) {
    //console.log(returnedData);
    this.roleForm.controls['rolename'].disable();
    this.roleForm.controls['role_id'].disable();
    this.parsedData = JSON.parse(returnedData);
    //console.log(this.parsedData);

    switch(this.parsedData[0].access_all_users) {
      case "0": {
        this.all_usersControl_value = false;
        break;
      }
      case "1": {
        this.all_usersControl_value = true;
        break;
      } 
    }

    switch(this.parsedData[0].access_properties) {
      case "0": {
        this.propertiesControl_value = false;
        break;
      }
      case "1": {
        this.propertiesControl_value = true;
        break;
      } 
    }

    switch(this.parsedData[0].access_manage_blog) {
      case "0": {
        this.blogControl_value = false;
        break;
      }
      case "1": {
        this.blogControl_value = true;
        break;
      } 
    }

    switch(this.parsedData[0].access_manage_roles) {
      case "0": {
        this.roleControl_value = false;
        break;
      }
      case "1": {
        this.roleControl_value = true;
        break;
      } 
    }

   /* switch(this.parsedData[0].access_requirements) {
      case "0": {
        this.requirementsControl_value = false;
        break;
      }
      case "1": {
        this.requirementsControl_value = true;
        break;
      } 
    } */

    switch(this.parsedData[0].access_reviews) {
      case "0": {
        this.reviewsControl_value = false;
        break;
      }
      case "1": {
        this.reviewsControl_value = true;
        break;
      } 
    }

    switch(this.parsedData[0].access_lawyer_services) {
      case "0": {
        this.lawyerControl_value = false;
        break;
      }
      case "1": {
        this.lawyerControl_value = true;
        break;
      } 
    }

    switch(this.parsedData[0].access_loan_control) {
      case "0": {
        this.loanControl_value = false;
        break;
      }
      case "1": {
        this.loanControl_value = true;
        break;
      } 
    }

    switch(this.parsedData[0].access_user_creator) {
      case "0": {
        this.user_creatorControl_value = false;
        break;
      }
      case "1": {
        this.user_creatorControl_value = true;
        break;
      } 
    }

    switch(this.parsedData[0].access_list_property) {
      case "0": {
        this.listPropertyControl_value = false;
        break;
      }
      case "1": {
        this.listPropertyControl_value = true;
        break;
      } 
    }
    

    this.roleForm.patchValue({
      rolename: this.parsedData[0].role,
      role_id: this.parsedData[0].role_id,
      all_usersControl:  this.all_usersControl_value,
      propertiesControl: this.propertiesControl_value,
      blogControl: this.blogControl_value,
      roleControl: this.roleControl_value,
     // requirementsControl: this.requirementsControl_value,
      reviewsControl: this.reviewsControl_value,
      lawyerControl: this.lawyerControl_value,
      loanControl: this.loanControl_value,
      user_creatorControl: this.user_creatorControl_value,
      listPropertyControl: this.listPropertyControl_value
    });
    //console.log(this.roleForm.controls);
  }


  onSubmit() {

    if (this.isAddMode) {
      this.createRole();
    } else {
      this.updateRole();
    }
  }

  private createRole() {
    this.showLoadingIndicator = true;
    //console.log("Role Creation Form Submitted");
    //console.log(this.roleForm);
    //console.log(this.roleForm.controls);
    //console.log(this.roleForm.controls['all_usersControl'].value);
    this.authService.create_role(this.roleForm).subscribe(
      data => {
        //console.log(data);
        this.response = data;
        this.showSuccess(this.response.message);
        this.showLoadingIndicator = false;
        this._router.navigate(['manage-roles']);
      },
      err => {
        //console.log(err);
        this.showLoadingIndicator = false;
      }
    );
  }

  private updateRole() {
    this.showLoadingIndicator = true;
    //console.log("Role Update Form Submitted");
    var updateRoleData: any = new FormData();
    this.id = this.route.snapshot.params['id'];
    //console.log(this.id);

    switch(this.roleForm.value.all_usersControl) {
      case false: {
        this.all_usersControl_update_value = 0;
        break;
      }
      case true: {
        this.all_usersControl_update_value = 1;
        break;
      } 
    }

    switch(this.roleForm.value.propertiesControl) {
      case false: {
        this.propertiesControl_update_value = 0;
        break;
      }
      case true: {
        this.propertiesControl_update_value = 1;
        break;
      } 
    }

   /* switch(this.roleForm.value.requirementsControl) {
      case false: {
        this.requirementsControl_update_value = 0;
        break;
      }
      case true: {
        this.requirementsControl_update_value = 1;
        break;
      } 
    } */

    switch(this.roleForm.value.reviewsControl) {
      case false: {
        this.reviewsControl_update_value = 0;
        break;
      }
      case true: {
        this.reviewsControl_update_value = 1;
        break;
      } 
    }

    switch(this.roleForm.value.lawyerControl) {
      case false: {
        this.lawyerControl_update_value = 0;
        break;
      }
      case true: {
        this.lawyerControl_update_value = 1;
        break;
      } 
    }

    switch(this.roleForm.value.loanControl) {
      case false: {
        this.loanControl_update_value = 0;
        break;
      }
      case true: {
        this.loanControl_update_value = 1;
        break;
      } 
    }

    switch(this.roleForm.value.user_creatorControl) {
      case false: {
        this.user_creatorControl_update_value = 0;
        break;
      }
      case true: {
        this.user_creatorControl_update_value = 1;
        break;
      } 
    }

    switch(this.roleForm.value.blogControl) {
      case false: {
        this.blogControl_update_value = 0;
        break;
      }
      case true: {
        this.blogControl_update_value = 1;
        break;
      } 
    }

    switch(this.roleForm.value.roleControl) {
      case false: {
        this.roleControl_update_value = 0;
        break;
      }
      case true: {
        this.roleControl_update_value = 1;
        break;
      } 
    }

    switch(this.roleForm.value.listPropertyControl) {
      case false: {
        this.listPropertyControl_update_value = 0;
        break;
      }
      case true: {
        this.listPropertyControl_update_value = 1;
        break;
      } 
    }

    updateRoleData.append('access_all_users', this.all_usersControl_update_value);
    updateRoleData.append('access_properties', this.propertiesControl_update_value);
    //updateRoleData.append('access_requirements', this.requirementsControl_update_value);
    updateRoleData.append('access_reviews', this.reviewsControl_update_value);
    updateRoleData.append('access_lawyer_services', this.lawyerControl_update_value);
    updateRoleData.append('access_loan_control', this.loanControl_update_value);
    updateRoleData.append('access_user_creator', this.user_creatorControl_update_value);
    updateRoleData.append('access_manage_blog', this.blogControl_update_value);
    updateRoleData.append('access_manage_roles', this.roleControl_update_value);
    updateRoleData.append('access_list_property', this.listPropertyControl_update_value);

    this.authService.update_role(updateRoleData, this.id).subscribe(
      res => {
        //console.log(res);
        this.response = res;
        this.showSuccess(this.response.message);
        this.showLoadingIndicator = false;
        this._router.navigate(['manage-roles']);
      },
      err => {
        this.showLoadingIndicator = false;
        //console.log(err);
      }
    );
    
  }


  getStats(checkbox_value: any, isChecked: boolean) {
    //console.log(checkbox_value);
    //console.log(isChecked);
    this.checkbox_status = isChecked;
  }

  role_list() {
    this._router.navigate(['manage-roles']);
  }

}
