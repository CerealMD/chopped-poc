import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AddNewAnswerPopUpComponent } from 'src/app/background-components/components/add-new-answer-pop-up/add-new-answer-pop-up.component';
import { AddNewIngredientPopUpComponent } from 'src/app/background-components/components/add-new-ingredient-pop-up/add-new-ingredient-pop-up.component';
import { ErrorPopUpComponent } from 'src/app/background-components/components/error-pop-up/error-pop-up.component';
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
    public router: Router,
    private dbConnection: dbConnectionService
  ) {}

  ngOnInit(): void {
    this.subusername = this.dbConnection.username.pipe(takeUntil(this.unsubscribe)).subscribe(username => {
     console.log(username)
      if(!username){
        this.router.navigate(['login-page']);
     }
    })
    this.dbConnection.showSpinnerSub.next(true);
    this.dbConnection
      .getItems()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        let data = JSON.parse(JSON.stringify(response));
        // console.log(data);
        this.currentFoods = data.response.Items;
        // console.log(this.currentFoods);
        for (let x of this.currentFoods) {
          this.ingredientsList.push(x.ingredient);
        }
        // console.log(this.ingredientsList);
        this.numbers = Array.from(
          Array(this.ingredientsList.length + 1),
          (x, i) => i
        );
        // console.log(this.numbers);
        this.shuffle(this.ingredientsList);
      });
      this.sub = this.dbConnection.showSpinnerSub.pipe(takeUntil(this.unsubscribe)).subscribe(spinner => {
        this.showSpinner = spinner;
        console.log(this.showSpinner)
      })
  }
  newSelect(event) {
    console.log(event);
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
          console.log(data);
          this.ingredientsList = [];
          this.ngOnInit();
     
      }
     
    });
  }
  addResponse() {
    console.log(this.ingredientsList.slice(0, this.selectedValue));
    console.log(this.ingredientsList.slice(0, this.selectedValue));
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
        console.log(response)
        const finished = this.dialog.open(
          ErrorPopUpComponent,
          {
            data: {
              message: 'New Response added'
            },
            disableClose: true
          }
        );
        console.log(response);
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
}

