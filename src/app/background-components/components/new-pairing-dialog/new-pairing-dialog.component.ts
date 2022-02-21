import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { dbConnectionService } from '../../services/callDbConnection';
import { ShowPairingDialogComponent } from '../show-pairing-dialog/show-pairing-dialog.component';

@Component({
  selector: 'app-new-pairing-dialog',
  templateUrl: './new-pairing-dialog.component.html',
  styleUrls: ['./new-pairing-dialog.component.css']
})
export class NewPairingDialogComponent implements OnInit {
  pairingItem1;
  pairingItem2;
  counter: any;
  unsubscribe: Subject<any> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowPairingDialogComponent>,
    public dbCAll: dbConnectionService
  ) {}

  ngOnInit(): void {}
  async sumbitAnswer() {
    console.log(this.pairingItem1);
    console.log(this.pairingItem2);
    if (this.pairingItem1 !== this.pairingItem2) {
      if (this.pairingItem1 !== '' && this.pairingItem1 !== undefined) {
        if (this.data.proccess === 'Add') {
          if (this.pairingItem2 !== '' && this.pairingItem2 !== undefined) {

            await this.addPairing(this.pairingItem1, this.pairingItem2, 1);

            this.dialogRef.close(true);
          }
        } else if (this.data.proccess === 'Delete') {
          await this.deletePairing(this.pairingItem1);
          this.dialogRef.close(true);
        }
      }
    }
  }
  deletePairing(item1: any) {
    if (this.data.array.length === 0) {
      return;
    }
    let index = this.data.array.findIndex(value => value.foodItem === item1);
    let getCorrectIndex = this.data.array[index].index
    let deletething = {"index": 0};
    // let deletething = {"index": getCorrectIndex};
    this.dbCAll
      .deleteToPairing(deletething)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        return;
      });
  }
  async addPairing(item1: any, item2: any, num) {
    let checkAlreadyWorked = 0;
    if (this.data.array.length === 0) {
      let newFood = {
        index: 0,
        pairingArray: [
          {
            foodItem: item2,
          },
        ],
        foodItem: item1,
      };
      this.data.array.push(newFood);
          console.log('None exist right now')
          await this.dbCAll
        .postToPairing(newFood)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((data) => {
          return;
        });
    } else {
      // for (let obj of this.data.array) {
      this.data.array.forEach(async (obj, index) => {
        console.log(index)
        if (obj.foodItem === item1) {
          console.log(item1, 'exists')                
          checkAlreadyWorked++;
          let index = await obj.pairingArray.findIndex(
            (element) => element.foodItem === item2
          );
          console.log(index, 'location')
          if (index < 0) {
            let newItem = {
              foodItem: item2,
            };
            obj.pairingArray.push(newItem);
            // console.log(obj)
            console.log('a.dding to an existing one');
            await this.dbCAll
              .postToPairing(obj)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe((data) => {
                return;
              });
          } else {
            console.log('not creating anything');
            return;
          }
        } else if (
          index + 1 === this.data.array.length &&
          checkAlreadyWorked < 1
        ) {
          checkAlreadyWorked++;
          let newFood = {
            index: this.data.array.length,
            pairingArray: [
              {
                foodItem: item2,
              },
            ],
            foodItem: item1,
          };
          this.data.array.push(newFood);
            console.log('making a new one');
            await this.dbCAll
            .postToPairing(newFood)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => {
              
              return;
            });
        }
      });
    }
    if(num > 0){
      this.addPairing(item2, item1, 0)
    }
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
}
