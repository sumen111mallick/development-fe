import { Component, OnInit } from '@angular/core';
import { InternalUserService } from './../_services/internal-user.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.css']
})
export class ViewRolesComponent implements OnInit {

  private all_usersControl_value: boolean;
  private propertiesControl_value: boolean;
  private blogControl_value: boolean;
  //private requirementsControl_value: boolean;
  private reviewsControl_value: boolean;
  private lawyerControl_value: boolean;
  private loanControl_value: boolean;
  private user_creatorControl_value: boolean;
  private roleControl_value: boolean;
  private listPropertyControl_value: boolean;

  viewDetailsForm = this.fb.group({
    rolename: [{ value: '', disabled: true }],
    role_id: [{ value: '', disabled: true }],
    all_usersControl: [{ value: '', disabled: true }],
    propertiesControl: [{ value: '', disabled: true }],
    blogControl: [{ value: '', disabled: true }],
    //requirementsControl: [{ value: '', disabled: true }],
    reviewsControl: [{ value: '', disabled: true }],
    lawyerControl: [{ value: '', disabled: true }],
    loanControl: [{ value: '', disabled: true }],
    user_creatorControl: [{ value: '', disabled: true }],
    roleControl: [{ value: '', disabled: true }],
    listPropertyControl: [{ value: '', disabled: true }]
  });

  private activatedRouteSnapshot: string;
  public role_detail: any = [];

  constructor(private internalUserService: InternalUserService,
    private _ActivatedRoute: ActivatedRoute, private _router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRouteSnapshot = this._ActivatedRoute.snapshot.params.id;

    this.internalUserService.get_role(this.activatedRouteSnapshot).subscribe(
      res => {
        console.log(res);
        this.role_detail = JSON.parse(res);
        console.log(this.role_detail);

        switch (this.role_detail[0].access_all_users) {
          case "0": {
            this.all_usersControl_value = false;
            break;
          }
          case "1": {
            this.all_usersControl_value = true;
            break;
          }
        }

        switch (this.role_detail[0].access_properties) {
          case "0": {
            this.propertiesControl_value = false;
            break;
          }
          case "1": {
            this.propertiesControl_value = true;
            break;
          }
        }

        switch (this.role_detail[0].access_manage_blog) {
          case "0": {
            this.blogControl_value = false;
            break;
          }
          case "1": {
            this.blogControl_value = true;
            break;
          }
        }

        /*switch (this.role_detail[0].access_requirements) {
          case "0": {
            this.requirementsControl_value = false;
            break;
          }
          case "1": {
            this.requirementsControl_value = true;
            break;
          }
        }*/

        switch (this.role_detail[0].access_reviews) {
          case "0": {
            this.reviewsControl_value = false;
            break;
          }
          case "1": {
            this.reviewsControl_value = true;
            break;
          }
        }

        switch (this.role_detail[0].access_lawyer_services) {
          case "0": {
            this.lawyerControl_value = false;
            break;
          }
          case "1": {
            this.lawyerControl_value = true;
            break;
          }
        }

        switch (this.role_detail[0].access_loan_control) {
          case "0": {
            this.loanControl_value = false;
            break;
          }
          case "1": {
            this.loanControl_value = true;
            break;
          }
        }

        switch (this.role_detail[0].access_user_creator) {
          case "0": {
            this.user_creatorControl_value = false;
            break;
          }
          case "1": {
            this.user_creatorControl_value = true;
            break;
          }
        }

        switch (this.role_detail[0].access_manage_roles) {
          case "0": {
            this.roleControl_value = false;
            break;
          }
          case "1": {
            this.roleControl_value = true;
            break;
          }
        }

        switch (this.role_detail[0].access_list_property) {
          case "0": {
            this.listPropertyControl_value = false;
            break;
          }
          case "1": {
            this.listPropertyControl_value = true;
            break;
          }
        }

        this.viewDetailsForm.patchValue({
          rolename: this.role_detail[0].role,
          role_id: this.role_detail[0].role_id,
          all_usersControl: this.all_usersControl_value,
          propertiesControl: this.propertiesControl_value,
          blogControl: this.blogControl_value,
         // requirementsControl: this.requirementsControl_value,
          reviewsControl: this.reviewsControl_value,
          lawyerControl: this.lawyerControl_value,
          loanControl: this.loanControl_value,
          user_creatorControl: this.user_creatorControl_value,
          roleControl: this.roleControl_value,
          listPropertyControl: this.listPropertyControl_value
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  role_list() {
    this._router.navigate(['manage-roles']);
  }


}
