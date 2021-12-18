import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AmpService } from '../background-components/services/ampService';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  jwtHelper: any;
  _isLoggedIn = false;
  constructor(public ampService: AmpService, public router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  set isLoggedIn(val: boolean) {
    this._isLoggedIn = val;
  }

  setUserData(idToken, accessToken, refreshToken) {
    console.log(idToken);
    const decodedIdToken = this.getDecodedAccessToken(idToken);
    console.log(decodedIdToken);
    const userGroups = decodedIdToken['cognito:groups'];
    console.log(userGroups);
    if (userGroups) {
      for (let i = 0; i < userGroups.length; i++) {
        if (userGroups[i] === 'base-user') {
          this.ampService.isBaseUser = true;
        }
        if (userGroups[i] === 'test-account') {
          this.ampService.isTest_Account = true;
        }
        if (userGroups[i] === 'admin') {
          this.ampService.isAdmin = true;
        }
      }
    } else {
      this.ampService.isAdmin = false;
      this.ampService.isTest_Account = false;
      this.ampService.isBaseUser = false;
    }
    return true
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
