import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShowPairingDialogComponent } from '../show-pairing-dialog/show-pairing-dialog.component';

@Component({
  selector: 'app-show-replace-dialog',
  templateUrl: './show-replace-dialog.component.html',
  styleUrls: ['./show-replace-dialog.component.css']
})
export class ShowReplaceDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ShowPairingDialogComponent>) { }

  ngOnInit(): void {
  }

}
