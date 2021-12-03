import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorPopUpComponent } from '../error-pop-up/error-pop-up.component';

@Component({
  selector: 'app-add-new-ingredient-pop-up',
  templateUrl: './add-new-ingredient-pop-up.component.html',
  styleUrls: ['./add-new-ingredient-pop-up.component.css']
})
export class AddNewIngredientPopUpComponent implements OnInit {
newVariable;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  sumbitAnswer(){
      if(this.newVariable != '' && this.newVariable != undefined){
        console.log(this.newVariable)
      }
      else{
        const addIngredientDialogRef = this.dialog.open(
          ErrorPopUpComponent,
          {
            data: {
              message: 'Error: Please Enter An Ingrediant'
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
