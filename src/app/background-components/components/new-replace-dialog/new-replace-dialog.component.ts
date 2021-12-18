import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from '../../services/callDbConnection';

@Component({
  selector: 'app-new-replace-dialog',
  templateUrl: './new-replace-dialog.component.html',
  styleUrls: ['./new-replace-dialog.component.css'],
})
export class NewReplaceDialogComponent implements OnInit {
  replacingItem1;
  replacingItem2;
  counter: any;
  unsubscribe: Subject<any> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewReplaceDialogComponent>,
    public dbCAll: dbConnectionService
  ) {}

  ngOnInit(): void {}
  async sumbitAnswer() {
    console.log(this.replacingItem1);
    console.log(this.replacingItem2);
    if (this.replacingItem1 !== this.replacingItem2) {
      if (this.replacingItem1 !== '' && this.replacingItem1 !== undefined) {
        if (this.data.proccess === 'Add') {
          if (this.replacingItem2 !== '' && this.replacingItem2 !== undefined) {
            console.log(this.data.proccess);
            await this.addReplacing(this.replacingItem1, this.replacingItem2);
            console.log('switch');
            await this.addReplacing(this.replacingItem2, this.replacingItem1);
            console.log('reload');
            this.dialogRef.close(true);
          }
        } else if (this.data.proccess === 'Delete') {
          await this.deleteReplacing(this.replacingItem1);
          this.dialogRef.close(true);
        }
      }
    }
  }
  deleteReplacing(item1: any) {
    if (this.data.array.length === 0) {
      return;
    }
    let index = this.data.array.findIndex(value => value.foodItem === item1);
    let getCorrectIndex = this.data.array[index].index
    let deletething = {"index": getCorrectIndex};
    this.dbCAll
      .deleteToReplacing(deletething)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        return;
      });
  }
  addReplacing(item1: any, item2: any) {
    let checkAlreadyWorked = 0;
    if (this.data.array.length === 0) {
      let newFood = {
        index: 0,
        replacingArray: [
          {
            foodItem: item2,
          },
        ],
        foodItem: item1,
      };
      this.data.array.push(newFood);
      this.dbCAll
        .postToReplace(newFood)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((data) => {
          return;
        });
        return;
    } else {
      // for (let obj of this.data.array) {
      this.data.array.forEach((obj, index) => {
        if (obj.foodItem === item1) {
          let index = obj.replacingArray.findIndex(
            (element) => element.foodItem === item2
          );
          if (index < 0) {
            let newItem = {
              foodItem: item2,
            };
            obj.replacingArray.push(newItem);
            // console.log(obj)
            this.dbCAll
              .postToReplace(obj)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe((data) => {
                checkAlreadyWorked++;
                return;
              });checkAlreadyWorked++;
              return;
          } else {
            console.log('exists');
            checkAlreadyWorked++;
            return;
          }
        } else if (
          index + 1 === this.data.array.length &&
          checkAlreadyWorked < 1
        ) {
          let newFood = {
            index: this.data.array.length,
            replacingArray: [
              {
                foodItem: item2,
              },
            ],
            foodItem: item1,
          };
          this.data.array.push(newFood);
          this.dbCAll
            .postToReplace(newFood)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => {
              checkAlreadyWorked++;
              return;
            });checkAlreadyWorked++;
            return;
        }
      });
    }
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
