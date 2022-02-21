import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Amplify from '@aws-amplify/core';
import { Subject, takeUntil } from 'rxjs';
import { ErrorPopUpComponent } from 'src/app/background-components/components/error-pop-up/error-pop-up.component';
import { NewReplaceDialogComponent } from 'src/app/background-components/components/new-replace-dialog/new-replace-dialog.component';
import { ShowPairingDialogComponent } from 'src/app/background-components/components/show-pairing-dialog/show-pairing-dialog.component';
import { AmpService } from 'src/app/background-components/services/ampService';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';

@Component({
  selector: 'app-replacement-page',
  templateUrl: './replacement-page.component.html',
  styleUrls: ['./replacement-page.component.css']
})
export class ReplacementPageComponent implements OnInit {
  subusername: any;
  showSpinner =false;
  unsubscribe: Subject<any> = new Subject();
  sub: any;
  pairingArray: any;
  dataSource: any;
  isAdmin = this.ampService.isAdmin
  isTest_Account = this.ampService.isTest_Account
  isBaseUser = this.ampService.isBaseUser
  displayedColumns = ['item'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public ampService: AmpService,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.getInfo();
  }
  getInfo() {
    this.dbConnection.showSpinnerSub.next(true);
    this.dbConnection
    .getReplace()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((response) => {
      this.pairingArray = response['response']['Items']
      console.log(this.pairingArray)
      this.dataSource = new MatTableDataSource(this.pairingArray);
        this.dataSource.paginator = this.paginator;
      // console.log(response)
    this.dbConnection.showSpinnerSub.next(false);
    });
  }
  ngAfterViewInit() {
    if(this.dataSource){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;}
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
// console.log(this.dataSource)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  popUpAnswer(row) {
    if(!this.isAdmin && !this.isBaseUser){
      const addIngredientDialogRef = this.dialog.open(
        ErrorPopUpComponent,
        {
          data: {
            message: 'Please contact admin to upgrade your account to see this information'
          },
          disableClose: true
        }
      );
      addIngredientDialogRef.afterClosed().subscribe((data) => {
      });
    }
    else{
    const addIngredientDialogRef = this.dialog.open(
      ShowPairingDialogComponent,
      {
        data: {
          message: 'hello',
          currentPairing: row,
        },
        disableClose: true,
        panelClass: 'showPairingDialog'
      }
    );
    addIngredientDialogRef.afterClosed().subscribe((data) => {
    });}
  }
  newPairing(){
    const addIngredientDialogRef = this.dialog.open(
      NewReplaceDialogComponent,
      {
        data: {
          message: 'Add a new pairing',
          proccess: 'Add',
          array: this.pairingArray
        },
        disableClose: true,
        panelClass: 'showPairingDialog'
      }
    );
    addIngredientDialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.getInfo()
        this.getInfo()
      }
    });
  }
  deletePairing(){
    const deleteIngredientDialogRef = this.dialog.open(
      NewReplaceDialogComponent,
      {
        data: {
          message: 'Delete a pairing',
          proccess: 'Delete',
          array: this.pairingArray
        },
        disableClose: true,
        panelClass: 'showPairingDialog'
      }
    );
    deleteIngredientDialogRef.afterClosed().subscribe((data) => {
    });
  }
}

