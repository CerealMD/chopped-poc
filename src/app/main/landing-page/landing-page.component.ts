import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AddNewAnswerPopUpComponent } from 'src/app/background-components/components/add-new-answer-pop-up/add-new-answer-pop-up.component';
import { AddNewIngredientPopUpComponent } from 'src/app/background-components/components/add-new-ingredient-pop-up/add-new-ingredient-pop-up.component';
import { ErrorPopUpComponent } from 'src/app/background-components/components/error-pop-up/error-pop-up.component';
import { AmpService } from 'src/app/background-components/services/ampService';
import { dbConnectionService } from 'src/app/background-components/services/callDbConnection';
export class foodItem {
  public statusFlag: boolean;
  public statusCode: string;
  public response: object;
  unsubscribe: any;

  constructor(statusFlag: boolean, statusCode: string, response: object) {
    this.statusFlag = statusFlag;
    this.statusCode = statusCode;
    this.response = response;
  }
}
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  showSpinner =false;
  ingredientsList: any = [];
  selectedValue: any;
  numbers: any;
  showItems = false;
  isAdmin = this.ampService.isAdmin
  isTest_Account = this.ampService.isTest_Account
  joke;
  ingredientsLists: any;
  foodItem: any;
  currentFoods: any;
  unsubscribe: Subject<any> = new Subject();
  sub;
  url = 'www.google.com';
  subusername: any;
  constructor(
    public dialog: MatDialog,
    public router: Router,public ampService: AmpService,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.dbConnection.showSpinnerSub.next(true);
    this.dbConnection
      .getItems()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        let data = JSON.parse(JSON.stringify(response));
        this.currentFoods = data.response.Items;
        for (let x of this.currentFoods) {
          this.ingredientsList.push(x.ingredient);
        }
        this.numbers = Array.from(
          Array(this.ingredientsList.length + 1),
          (x, i) => i
        );
        this.shuffle(this.ingredientsList);
      });
  }
  newSelect(event) {
    // this.shuffle(this.ingredientsList);
  }
  switchShow() {
    this.shuffle(this.ingredientsList);
    if (this.showItems) {
      this.showItems = false;
    this.selectedValue = undefined

    } else {
      this.shuffleAlph(this.ingredientsList)
      this.showItems = true;
    this.selectedValue = this.numbers.length + 1

    }
  }
  shuffle(array) {
    this.dbConnection.showSpinnerSub.next(true);
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    this.dbConnection.showSpinnerSub.next(false);
    return array;
  }
  addIngredient() {
    const addIngredientDialogRef = this.dialog.open(
      AddNewIngredientPopUpComponent,
      {
        data: {
          message: 'hello',
          currentIngredients: this.ingredientsList,
        },
        disableClose: true,
      }
    );
    addIngredientDialogRef.afterClosed().subscribe((data) => {
      if(data === undefined){
        this.showItems = false;
          this.selectedValue = undefined
        const finished = this.dialog.open(
          ErrorPopUpComponent,
          {
            data: {
              message: 'New Ingredient added'
            },
            disableClose: true
          }
        );
       
          this.dbConnection.showSpinnerSub.next(true);
          this.ingredientsList = [];
          this.ngOnInit();
     
      }
     
    });
  }
  addResponse() {
    const addResponseDialogRef = this.dialog.open(AddNewAnswerPopUpComponent, {
      data: {
        message: 'hello',
        currentIngredients: this.ingredientsList.slice(0, this.selectedValue),
        fullList: this.ingredientsList,
      },
      disableClose: true,
    });
    addResponseDialogRef.afterClosed().subscribe((response) => {
      if(response === undefined){
        const finished = this.dialog.open(
          ErrorPopUpComponent,
          {
            data: {
              message: 'New Response added'
            },
            disableClose: true
          }
        );
      }
     
    });
  }
  haHafU() {
    if (this.joke) {
      this.joke = false;
    } else {
      this.joke = true;
    }
  }
  toAnswers() {
    this.router.navigate(['home']);
  }
  searchItem(item){
    this.url = `https://www.google.com/search?q=` + item
   // @ts-ignore: Object is possibly 'null'.
    window.open(this.url, '_blank').focus();
  }
  shuffleAlph(array) {
    array.sort();
    return array;
  }
  ngDestroy() {
    this.unsubscribe.next(false);
    this.unsubscribe.complete();
  }
  CheckAmount(num){
    if(num == 1 ){
return 'onefullListView';
    }else if(num == 3){
      return 'threefullListView';

    }else if(num ==2 ){
      return 'twofullListView';

    }else{
      return 'fullListView';
    }
  }
  userCheck(){
    if(this.isTest_Account){
      return 'twoButtons'
    }
    else{
      return 'fourButtons'
    }
  }
}

