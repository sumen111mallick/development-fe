import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MessageModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
