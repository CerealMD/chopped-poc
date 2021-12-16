import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ErrorPopUpComponent } from 'src/app/background-components/components/error-pop-up/error-pop-up.component';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  backgroundimg = 'src\\app\\images\\circle.jpg';
  username;
  password;
  baseusername = 'user';
  basepassword = 'password';
  unsubscribe: Subject<any> = new Subject();
  showSpinner: any;
  sub: any;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
  }
  async awsLogin(){
    console.log('trying AWS login')
  try {
    const user = await Auth.signIn(this.username, this.password).then( response => 
    console.log(response)
    );
    console.log(user)
} catch (error) {
    console.log('error signing in', error);
}
}
  login() {
    this.dbConnection.showSpinnerSub.next(true);
    if (this.username !== '' && this.username !== undefined) {
      if (this.password !== '' && this.password !== undefined) {
        if (
          this.username === this.baseusername &&
          this.password === this.basepassword
        ) {
          this.dbConnection.username.next(this.username);
          this.dbConnection.showSpinnerSub.next(false);
          this.dbConnection.showHeaderFooter.next(true);
          this.router.navigate(['home']);
        } else {
          this.dbConnection.showSpinnerSub.next(false);

          const finished = this.dialog.open(ErrorPopUpComponent, {
            data: {
              message: 'Username: user, Password:password',
            },
            disableClose: true,
          });
        }
      } else {
        this.dbConnection.showSpinnerSub.next(false);

        const finished = this.dialog.open(ErrorPopUpComponent, {
          data: {
            message: 'Please add your password',
          },
          disableClose: true,
        });
      }
    } else {
      this.dbConnection.showSpinnerSub.next(false);

      const finished = this.dialog.open(ErrorPopUpComponent, {
        data: {
          message: 'Please add your username',
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
