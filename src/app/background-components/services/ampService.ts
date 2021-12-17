import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import { dbConnectionService } from './callDbConnection';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { ForcePassResetDialogComponent } from '../components/force-pass-reset-dialog/force-pass-reset-dialog.component';
import { ErrorPopUpComponent } from '../components/error-pop-up/error-pop-up.component';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ providedIn: 'root' })
export class AmpService {
  private user: CognitoUserInterface | undefined;
  cognitoID: any;
  username: any;
  isBaseUser;
  isTest_Account;
  isAdmin;
  jwtHelper = new JwtHelperService();
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  async login(Username, Password, callback) {
    try {
      const user = await Auth.signIn(Username, Password);
      console.log(user);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        if (user.challengeParam.userAttributes.email_verified !== undefined) {
          console.log(user.challengeParam.userAttributes.email_verified);
        }
        const newdialog = this.dialog
          .open(ForcePassResetDialogComponent, {
            data: {
              message: 'Please add your username',
            },
            disableClose: true,
          })
          .afterClosed()
          .subscribe(async (val) => {
            const loggedUser = Auth.completeNewPassword(user, val.newPass).then(
              (newPasswordResult) => {
                console.log('new pass', newPasswordResult);
                this.login(Username, val.newPass, callback);
              },
              (err) => {
                console.log(err);
                callback.handleCognito(err, null);
              }
            );
          });
      } else {
        console.log(user);
        console.log(user.challengeName);
        callback.handleCognito(null, user.signInUserSession);
      }
    } catch (error) {
      console.log('error signing in', error);
      const newdialog = this.dialog.open(ErrorPopUpComponent, {
        data: {
          message: error,
        },
        disableClose: true,
      });
      this.dbConnection.showHeaderFooter.next(false);
    }
  }
  async getCurrentUser() {
    console.log('get current user');
    return new Promise(async (resolve) => {
      try {
        console.log('currentAuthenticatedUser');
        let user = await Auth.currentAuthenticatedUser();
        console.log(user);
        this.username = user.username;
        this.setID(user.attributes.sub);
        const accessToken = user.signInUserSession
          .getAccessToken()
          .getJwtToken();
        const idToken = user.signInUserSession.getIdToken().getJwtToken();
        const refreshToken = user.signInUserSession
          .getRefreshToken()
          .getToken();
        console.log(accessToken);
        console.log(idToken);
        console.log(refreshToken);
        const isExpired = this.jwtHelper.isTokenExpired(accessToken);
        if (!isExpired) {
          const decodedIdToken = this.jwtHelper.decodeToken(idToken);
          const tokenPayload = this.jwtHelper.decodeToken(idToken);
          return resolve({
            success: true,
            accessToken: accessToken,
            idToken: idToken,
            refreshToken: refreshToken,
          });
        } else {
          user.refreshSession(refreshToken, (err, session) => {
            if (err) {
              return resolve({ success: true });
            }
            user.setSignInUserSession(session);
            return resolve({
              success: true,
              accessToken: user.signInUserSession
                .getAccessToken()
                .getJwtToken(),
              idToken: user.signInUserSession.getIdToken().getJwtToken(),
              refreshToken: user.signInUserSession.getRefreshToken().getToken(),
            });
          });
        }
      } catch (error) {
        console.log(error);
        if (this.router.url !== 'login-page') {
          this.router.navigate(['login-page']);
        }
      }
      this.logout();
    });
  }
  setID(iD) {
    this.cognitoID = iD;
  }
  getID() {
    return this.cognitoID;
  }
  logout() {
    Auth.signOut();
  }
  async getUserName() {
    let user = await Auth.currentAuthenticatedUser();
    let name = user.username
    console.log(name);
    return name;
  }
  forgotPassword(username) {
    // Send confirmation code to user's email
    Auth.forgotPassword(username)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
