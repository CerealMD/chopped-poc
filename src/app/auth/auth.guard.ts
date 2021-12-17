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
import { dbConnectionService } from '../background-components/services/callDbConnection';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  jwtHelper: any;
  constructor(
    public ampService: AmpService,
    private dbConnection: dbConnectionService,
    public router: Router
  ) {
    this.jwtHelper = new JwtHelperService();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    return this.checkActiveSession();
  }

  checkActiveSession() {
    console.log('Check Active Session');
    return this.ampService
      .getCurrentUser()
      .then((result) => {
        console.log(result);
        const parsedResult = JSON.parse(JSON.stringify(result));
        if (parsedResult.success) {
          this.dbConnection.showHeaderFooter.next(true);
          return true;
        } else {
          this.dbConnection.showHeaderFooter.next(false);
          this.router.navigate(['login-page']);
          return false;
        }
      })
      .catch((result) => {
        console.log(result);
        this.dbConnection.showHeaderFooter.next(false);
        this.router.navigate(['login-page']);
        return false;
      });
  }
}
