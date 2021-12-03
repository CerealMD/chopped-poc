import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-pop-up',
  templateUrl: './error-pop-up.component.html',
  styleUrls: ['./error-pop-up.component.css']
})
export class ErrorPopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public error: any,
  public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.error)
  }
  
}
