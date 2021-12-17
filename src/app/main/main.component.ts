import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from '../background-components/services/callDbConnection';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  subusername: any;
  unsubscribe: Subject<any> = new Subject();
  sub: any;
  showSpinner = false;
  showdropdown = false;
  hideStuffs = false;
  subHF: any;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {

  }
  ngAfterContentInit() {
    // let user = Auth.currentUserCredentials();
    // console.log(user)
    this.subHF = this.dbConnection.showHeaderFooter
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((show) => {
        if (show === true || show === false) {
          this.hideStuffs = show;
        }
      });
    this.sub = this.dbConnection.showSpinnerSub
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((spinner) => {
        if (spinner === true || spinner === false) {
          this.showSpinner = spinner;
        }
      });
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
