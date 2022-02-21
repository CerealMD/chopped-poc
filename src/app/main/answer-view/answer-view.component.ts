import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AnswerPerOptionComponent } from 'src/app/background-components/components/answer-per-option/answer-per-option.component';
import { AmpService } from 'src/app/background-components/services/ampService';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.css'],
})
export class AnswerViewComponent implements OnInit {
  unsubscribe: Subject<any> = new Subject();
  allResponses: any;
  displayedColumns = ['username', 'itemsList'];
  columnsToDisplay = ['username', 'itemsList'];
  isTest_Account = this.ampService.isTest_Account
  dataSource;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  showSpinner: any;
  sub: any;
  subusername: any;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public ampService: AmpService,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.dbConnection.showSpinnerSub.next(true);
    this.dbConnection
      .getAnswers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        let data = JSON.parse(JSON.stringify(response));
        this.allResponses = data.response.Items;
        this.dataSource = new MatTableDataSource(this.allResponses);
        this.dataSource.paginator = this.paginator;
    this.dbConnection.showSpinnerSub.next(false);
      });
      this.sub = this.dbConnection.showSpinnerSub.pipe(takeUntil(this.unsubscribe)).subscribe(spinner => {
        this.showSpinner = spinner;
        console.log(this.showSpinner)
      })
  }
  ngAfterViewInit() {
    if(this.dataSource){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;}
  }
  toHome() {
    this.router.navigate(['home']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  popUpAnswer(row) {
    const addIngredientDialogRef = this.dialog.open(
      AnswerPerOptionComponent,
      {
        data: {
          message: 'hello',
          currentIngredients: row,
        },
        disableClose: true,
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
