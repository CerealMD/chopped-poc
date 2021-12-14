import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  subusername: any;
  unsubscribe: Subject<any> = new Subject();
  sub: any;
  showSpinner: any;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.dbConnection.showSpinnerSub.next(false);
    this.subusername = this.dbConnection.username
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((username) => {
        console.log(username);
        if (!username) {
          this.router.navigate(['login-page']);
        }
      });
    this.dbConnection.showSpinnerSub.next(false);
  }
  logout() {
    this.dbConnection.username.next(undefined);
    this.router.navigate(['login-page']);
  }
  reroute(location) {
    this.dbConnection.showSpinnerSub.next(true);
    switch (location) {
      case 'landing': {
        this.router.navigate(['landing-page']);
        break;
      }
      case 'answers': {
        this.router.navigate(['answer-view']);
        break;
      }
      case 'flavor': {
        this.router.navigate(['flavor-parring']);
        break;
      }
    }
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
