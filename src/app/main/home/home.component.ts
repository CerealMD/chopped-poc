import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignUpPopupComponent } from 'src/app/background-components/components/sign-up-popup/sign-up-popup.component';
import { AmpService } from 'src/app/background-components/services/ampService';
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
  isAdmin = this.ampService.isAdmin
  showSpinner: any;
  
  constructor(
    public dialog: MatDialog,
    public router: Router, public ampService: AmpService,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.dbConnection.showSpinnerSub.next(false);

  }
  logout() {
    this.ampService.logout()
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
  signUp(){
    const addIngredientDialogRef = this.dialog.open(
      SignUpPopupComponent,
      {
        data: {
          message: 'hello',
        },
        disableClose: true,
        panelClass: 'signUpDialog'
      }
    );
    addIngredientDialogRef.afterClosed().subscribe((data) => {
    });
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
