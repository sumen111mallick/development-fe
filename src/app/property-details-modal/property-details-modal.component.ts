import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-property-details-modal',
  templateUrl: './property-details-modal.component.html',
  styleUrls: ['./property-details-modal.component.css']
})
export class PropertyDetailsModalComponent implements OnInit {

  public response: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<PropertyDetailsModalComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(typeof(this.data));
    this.response = this.data;
  }

  closeModal() {
    this.dialogRef.close();
  }

}
