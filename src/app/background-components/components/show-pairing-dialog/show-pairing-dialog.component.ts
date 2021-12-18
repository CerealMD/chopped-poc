import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-pairing-dialog',
  templateUrl: './show-pairing-dialog.component.html',
  styleUrls: ['./show-pairing-dialog.component.css']
})
export class ShowPairingDialogComponent implements OnInit {
  selectedValue
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ShowPairingDialogComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  applyFilter(event) {

  }
}
