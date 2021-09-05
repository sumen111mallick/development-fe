import { Component, OnInit } from '@angular/core';
import { InternalUserService } from './../_services/internal-user.service';
import { FormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {

  public showLoadingIndicator: boolean = false;
  public response: any;
  public errorMessage: string;

  roleDetailsForm = this.fb.group({
    rolename: [''],
    role_id: [''],
    all_usersControl: [''],
    propertiesControl: [''],
    blogControl: [''],
    requirementsControl: [''],
    reviewsControl: [''],
    lawyerControl: [''],
    loanControl: [''],
    user_creatorControl: ['']
  });

  constructor(private internalUserService: InternalUserService,
    private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private _router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showLoadingIndicator = true;
    this.internalUserService.get_role_details().subscribe(
      data => {
        this.response = data;
        //console.log(data);
        this.showLoadingIndicator = false;
      },
      err => {
        //console.log(err);
        this.showLoadingIndicator = false;
      });
  }

  showSuccess($text) {
    this.toastr.success($text);
  }

  public openConfirmationDialog(role_id) {
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete ?')
      .then((confirmed) => {
        //console.log('User confirmed:', confirmed);
        if (confirmed == true) {
          this.deleteRole(role_id);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteRole(role_id) {
    this.showLoadingIndicator = true;
    this.internalUserService.deleteRole(role_id).subscribe(
      res => {
        //console.log(res);
        this.response = res;
        //console.log(this.response);
        this.showSuccess(this.response.message);
        this.internalUserService.get_role_details().subscribe(
          data => {
            this.response = data;
            //console.log(data);
            this.showLoadingIndicator = false;
          },
          err => {
            //console.log(err);
            this.showLoadingIndicator = false;
          });
      },
      err => {
        this.showLoadingIndicator = false;
        this.errorMessage = err.error.message;
        //console.log(err);
      }
    );
  }

  role_create() {
    this._router.navigate(['create-roles']);
  }

}
