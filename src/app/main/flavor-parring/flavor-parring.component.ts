import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';

@Component({
  selector: 'app-flavor-parring',
  templateUrl: './flavor-parring.component.html',
  styleUrls: ['./flavor-parring.component.css'],
})
export class FlavorParringComponent implements OnInit {
  subusername: any;
  showSpinner =false;
  unsubscribe: Subject<any> = new Subject();
  sub: any;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.dbConnection.showSpinnerSub.next(true);
    this.dbConnection.showSpinnerSub.next(false);
    this.subusername = this.dbConnection.username
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((username) => {
        if (!username) {
          this.router.navigate(['login-page']);
        }
      });
  }
  ngAfterContentInit() {}
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
