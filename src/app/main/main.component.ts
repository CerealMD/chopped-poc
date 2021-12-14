import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    this.subusername = this.dbConnection.username
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((username) => {
        if (!username || this.hideStuffs === false) {
          this.router.navigate(['login-page']);
        }
      });
  }
  ngAfterContentInit() {
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
  logout() {
    this.showdropdown = false;
    this.dbConnection.showHeaderFooter.next(false);
    this.dbConnection.username.next(undefined);
    this.router.navigate(['login-page']);
  }
  showdDropDown() {
    if (this.showdropdown) {
      this.showdropdown = false;
    } else {
      this.showdropdown = true;
    }
  }
  reroute(location) {
    let currentLocation = '/' + location;
    if (this.router.url === currentLocation) {
      this.showdropdown = false;
    console.log('same page');
    } else {
    this.dbConnection.showSpinnerSub.next(true);
    switch (location) {
        case 'landing-page': {
          this.showdropdown = false;
          this.router.navigate(['landing-page']);
          break;
        }
        case 'answer-view': {
          this.showdropdown = false;
          this.router.navigate(['answer-view']);
          break;
        }
        case 'flavor-parring': {
          this.showdropdown = false;
          this.router.navigate(['flavor-parring']);
          break;
        }
        case 'home': {
          this.dbConnection.showSpinnerSub.next(false);
          this.showdropdown = false;
          this.router.navigate(['home']);
          break;
        }
      }
    }
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
