import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { dbConnectionService } from '../../services/callDbConnection';
import { ErrorPopUpComponent } from '../error-pop-up/error-pop-up.component';
import { NewReplaceDialogComponent } from '../new-replace-dialog/new-replace-dialog.component';

@Component({
  selector: 'app-conf-sing-up-popup',
  templateUrl: './conf-sing-up-popup.component.html',
  styleUrls: ['./conf-sing-up-popup.component.css']
})
export class ConfSingUpPopupComponent implements OnInit {
  username;
  unsubscribe: Subject<any> = new Subject();
  code;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewReplaceDialogComponent>,
    public dialog: MatDialog,
    public dbCAll: dbConnectionService
  ) {}
  ngOnInit(): void {
  }
  async sumbitAnswer() {
    if (
      this.username !== '' &&
      this.username !== undefined &&
      this.code !== '' &&
      this.code !== undefined
    ) {
      await this.dbCAll.confirmSignUp(this.username, this.code);
      this.dialogRef.close();
    } else {
      let error = 'Please fill in Username, and Code';
      const newdialog = this.dialog.open(ErrorPopUpComponent, {
        data: {
          message: error,
        },
        disableClose: true,
      });
    }
  }
}
