import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ErrorPopUpComponent } from 'src/app/background-components/components/error-pop-up/error-pop-up.component';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';
import { Auth } from 'aws-amplify';
import { AmpService } from 'src/app/background-components/services/ampService';

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
  errorMessage: any;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService,
    public ampService: AmpService
  ) {}

  ngOnInit(): void {
  }
  async awsLogin(){
    console.log('trying AWS login')
 await this.ampService.login(this.username, this.password, this);
}
  async login() {
    this.dbConnection.showSpinnerSub.next(true);
    if (this.username !== '' && this.username !== undefined) {
      if (this.password !== '' && this.password !== undefined) {
        // if (
        //   this.username === this.baseusername &&
        //   this.password === this.basepassword
        // ) {
          this.dbConnection.username.next(this.username);
          this.dbConnection.showSpinnerSub.next(false);
          await this.ampService.login(this.username, this.password, this);
          this.router.navigate(['home']);
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
  handleCognito(error, result){
if(error != null){
  console.log(error);
  
  this.errorMessage = {
    message: error,
    title: 'Login Error'
  }
  const finished = this.dialog.open(ErrorPopUpComponent, {
    data: this.errorMessage,
    disableClose: true,
  });
}
else{
  console.log(result)

}
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
