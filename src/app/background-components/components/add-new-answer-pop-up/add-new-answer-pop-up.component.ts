import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorPopUpComponent } from '../error-pop-up/error-pop-up.component';

@Component({
  selector: 'app-add-new-answer-pop-up',
  templateUrl: './add-new-answer-pop-up.component.html',
  styleUrls: ['./add-new-answer-pop-up.component.css']
})
export class AddNewAnswerPopUpComponent implements OnInit {
  newVariable;
  userName;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }

  ngOnInit(): void {
    //Add code to add values to aws codebase
  }
  sumbitAnswer(){
    if(this.userName != '' && this.userName != undefined){
      if(this.newVariable != '' && this.newVariable != undefined){
        console.log(this.newVariable)
        console.log(this.userName)
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
          console.log(data);
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
        console.log(data);
      });
    }
  }
}
