import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from '../../services/callDbConnection';
import { ErrorPopUpComponent } from '../error-pop-up/error-pop-up.component';

@Component({
  selector: 'app-add-new-ingredient-pop-up',
  templateUrl: './add-new-ingredient-pop-up.component.html',
  styleUrls: ['./add-new-ingredient-pop-up.component.css'],
})
export class AddNewIngredientPopUpComponent implements OnInit {
  unsubscribe: Subject<any> = new Subject();
  newVariable;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {}
  sumbitAnswer() {
    if (this.newVariable != '' && this.newVariable != undefined) {
      this.dbConnection
        .PostItem2List(this.newVariable)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((data) => {
          console.log(data);
        });
      this.dialog.closeAll();
    } else {
      const addIngredientDialogRef = this.dialog.open(ErrorPopUpComponent, {
        data: {
          message: 'Error: Please Enter An Ingrediant',
        },
        disableClose: true,
      });
      addIngredientDialogRef.afterClosed().subscribe((data) => {
        console.log(data);
      });
    }
  }
  ngDestroy() {
    // this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
