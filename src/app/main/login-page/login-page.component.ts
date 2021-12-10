import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorPopUpComponent } from 'src/app/background-components/components/error-pop-up/error-pop-up.component';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';

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
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    console.log(this.backgroundimg);
  }

  login() {
    console.log();
    if (this.username !== '' && this.username !== undefined) {
      if (this.password !== '' && this.password !== undefined) {
        if (this.username === this.baseusername && this.password === this.basepassword) {
            this.dbConnection.username.next(this.username);
            this.router.navigate(['home']);
        }
        else{
          const finished = this.dialog.open(ErrorPopUpComponent, {
            data: {
              message: 'Username: user, Password:password',
            },
            disableClose: true,
          });
        }
      } else {
        const finished = this.dialog.open(ErrorPopUpComponent, {
          data: {
            message: 'Please add your password',
          },
          disableClose: true,
        });
      }
    } else {
      const finished = this.dialog.open(ErrorPopUpComponent, {
        data: {
          message: 'Please add your username',
        },
        disableClose: true,
      });
    }
  }
}
