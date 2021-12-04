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

  dataSource;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.dbConnection
      .getAnswers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        let data = JSON.parse(JSON.stringify(response));
        // console.log(data);
        this.allResponses = data.response.Items;
        console.log(this.allResponses);
        this.dataSource = new MatTableDataSource(this.allResponses);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
      });
  }
  ngAfterViewInit() {
    if(this.dataSource){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;}
  }
  toHome() {
    this.router.navigate(['landing-page']);
  }
  applyFilter(event: Event) {
    console.log(event)
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
      console.log(data);
    });
  }
}
