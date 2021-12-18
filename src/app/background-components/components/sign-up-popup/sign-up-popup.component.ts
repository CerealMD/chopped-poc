import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from '../../services/callDbConnection';
import { ErrorPopUpComponent } from '../error-pop-up/error-pop-up.component';
import { NewReplaceDialogComponent } from '../new-replace-dialog/new-replace-dialog.component';

@Component({
  selector: 'app-sign-up-popup',
  templateUrl: './sign-up-popup.component.html',
  styleUrls: ['./sign-up-popup.component.css'],
})
export class SignUpPopupComponent implements OnInit {
  username;
  unsubscribe: Subject<any> = new Subject();
  password;
  email;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewReplaceDialogComponent>,
    public dialog: MatDialog,
    public dbCAll: dbConnectionService
  ) {}

  ngOnInit(): void {}
  async sumbitAnswer() {
    if (
      this.username !== '' &&
      this.username !== undefined &&
      this.password !== '' &&
      this.password !== undefined &&
      this.email !== '' &&
      this.email !== undefined
    ) {
      await this.dbCAll.signUp(this.username, this.password, this.email);
      this.dialogRef.close();
    } else {
      let error = 'Please fill in Username, Password, and Email';
      const newdialog = this.dialog.open(ErrorPopUpComponent, {
        data: {
          message: error,
        },
        disableClose: true,
      });
    }
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
