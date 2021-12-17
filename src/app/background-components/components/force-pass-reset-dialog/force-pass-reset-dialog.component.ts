import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from '../../services/callDbConnection';
import { ErrorPopUpComponent } from '../error-pop-up/error-pop-up.component';

@Component({
  selector: 'app-force-pass-reset-dialog',
  templateUrl: './force-pass-reset-dialog.component.html',
  styleUrls: ['./force-pass-reset-dialog.component.css'],
})
export class ForcePassResetDialogComponent implements OnInit {
  confpassword;
  password;
  disableSubmit = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public error: any,
    public dialogRef: MatDialogRef<ForcePassResetDialogComponent>
  ) {}

  ngOnInit() {}
  sumbitAnswer() {
    this.dialogRef.close({ newPass: this.password });
  }
  checkSubmitStatus(password, confpassword) {
    this.disableSubmit = true;
    if (this.isAllPresent(password) && password.length > 8) {
      console.log('match level 1')
      if (password !== '' && password !== undefined) {
      console.log('match level 2')
      if (confpassword !== '' && confpassword !== undefined) {
      console.log('match level 3')
      console.log(confpassword)
      console.log(password)
      if (confpassword === password) {
      console.log('match level 4')
      this.disableSubmit = false;
          }
        }
      }
    }
  }
  isAllPresent(str) {
    // Regex to check if a string
    // contains uppercase, lowercase
    // special character & numeric value
    var pattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$'
    );

    // Print Yes If the string matches
    // with the Regex
    if (pattern.test(str)) {
      return true;
    } else {
      return false;
    }
  }
}
