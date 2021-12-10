import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subusername: any;
  unsubscribe: Subject<any> = new Subject();

  constructor( public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService) { }

  ngOnInit(): void {
    this.subusername = this.dbConnection.username.pipe(takeUntil(this.unsubscribe)).subscribe(username => {
      console.log(username)
       if(!username){
         this.router.navigate(['login-page']);
      }
     })
  }
  logout(){
    this.dbConnection.username.next(undefined);
    this.router.navigate(['login-page']);
  }
  reroute(location){
switch(location){
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

}
