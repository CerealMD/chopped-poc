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
  fullList: any;
  currentIngreds: any;
  displayList: any;
  searchTerm;
  currentSelectedIngreds: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }

  ngOnInit(): void {
    //Add code to add values to aws codebase
    console.log(this.data.currentIngredients)
    this.fullList = this.data.fullList
    this.displayList = this.data.fullList
    this.currentIngreds = this.data.currentIngredients
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
  newSelect(event){

  }
onKey(value) { 
  console.log(value)
  this.displayList = this.search(value);
if(value===''){
  this.searchTerm = ''
let newIngred = this.currentIngreds
this.currentIngreds = this.currentSelectedIngreds
this.currentIngreds.push(newIngred[0])
console.log(this.currentIngreds)
console.log(this.currentSelectedIngreds)
this.displayList = this.fullList;

}
else{
  // console.log('Value is present')
  this.currentSelectedIngreds = this.currentIngreds
  // console.log(this.displayList)
}
}

search(value: string) { 
  let filter = value.toLowerCase();
return this.fullList.filter(option => option.toLowerCase().startsWith(filter));
}
clearSearch(){
  this.onKey('')
}
}
