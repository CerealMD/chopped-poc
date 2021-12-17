import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AmpService } from '../../services/ampService';
import { dbConnectionService } from '../../services/callDbConnection';
import { ErrorPopUpComponent } from '../error-pop-up/error-pop-up.component';

@Component({
  selector: 'app-add-new-answer-pop-up',
  templateUrl: './add-new-answer-pop-up.component.html',
  styleUrls: ['./add-new-answer-pop-up.component.css']
})
export class AddNewAnswerPopUpComponent implements OnInit {
  newVariable;
  userName;
  fullList: any;
  currentIngreds: any;
  displayList: any;
  searchTerm;
  currentSelectedIngreds: any;
  unsubscribe: Subject<any> = new Subject();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private dbConnection: dbConnectionService, public ampService: AmpService) { }

  ngOnInit(): void {
    this.ampService.getUserName().then((userName) => {
      this.userName = this.ampService.capitalizeFirstLetter(userName)
    });
    console.log(this.userName)
    //Add code to add values to aws codebase
    this.fullList = this.data.fullList
    this.displayList = this.data.fullList
    this.currentIngreds = this.data.currentIngredients
  }
  sumbitAnswer(){
    if(this.userName != '' && this.userName != undefined){
      if(this.newVariable != '' && this.newVariable != undefined){
        let newRes = {
          username: this.userName,
          answer: this.newVariable,
          ingredients: this.currentIngreds
        }
        this.dbConnection
        .PostItem2Response(newRes)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((data) => {
        });
      this.dialog.closeAll();
      }
      else{
        const addIngredientDialogRef = this.dialog.open(
          ErrorPopUpComponent,
          {
            data: {
              message: 'Error: Please Enter A Response'
            },
            disableClose: true
          }
        );
        addIngredientDialogRef.afterClosed().subscribe((data) => {
        });
      }
    }
    else{
      const addIngredientDialogRef = this.dialog.open(
        ErrorPopUpComponent,
        {
          data: {
            message: 'Error: Please Enter Your Name'
          },
          disableClose: true
        }
      );
      addIngredientDialogRef.afterClosed().subscribe((data) => {
      });
    }
  }
  newSelect(event){

  }
onKey(value) { 
  this.displayList = this.search(value);
if(value===''){
  this.searchTerm = ''
let newIngred = this.currentIngreds
this.currentIngreds = this.currentSelectedIngreds
this.currentIngreds.push(newIngred[0])
this.displayList = this.fullList;

}
else{
  this.currentSelectedIngreds = this.currentIngreds

}
}

search(value: string) { 
  let filter = value.toLowerCase();
return this.fullList.filter(option => option.toLowerCase().startsWith(filter));
}
clearSearch(){
  this.onKey('')
}
ngDestroy() {
  this.unsubscribe.next(false);
  this.unsubscribe.complete();
}
}
