import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewAnswerPopUpComponent } from 'src/app/background-components/components/add-new-answer-pop-up/add-new-answer-pop-up.component';
import { AddNewIngredientPopUpComponent } from 'src/app/background-components/components/add-new-ingredient-pop-up/add-new-ingredient-pop-up.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  // Add code to get this list from Amazon
  ingredientsList = [
    'Chicken',
    'Turkey',
    'Salmon',
    'Collard Greens',
    'Kumquats',
    'Quail',
    'Black Garlic',
    'Tomatillos',
    'Rhubarb',
    'Baby Fennel',
    'Cactus Pears',
    'Zucchini',
    'Strawberries',
    'Avocados',
    'Escarole',
    'Duck Breast',
    'Rainbow Chard',
    'Jicama',
    'Blueberries',
    'Pineapple',
  ];
  selectedValue: any;
  numbers: any;
  showItems = false;
  joke;
  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {
    this.numbers = Array.from(Array(16), (x, i) => i);
    console.log(this.numbers);
    this.shuffle(this.ingredientsList);
  }
  newSelect(event) {
    console.log(event);
    // this.shuffle(this.ingredientsList);
  }
  switchShow() {
    // this.shuffle(this.ingredientsList);
    if (this.showItems) {
      this.showItems = false;
    } else {
      this.showItems = true;
    }
  }
  shuffle(array) {
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

    return array;
  }
  addIngredient() {
    const addIngredientDialogRef = this.dialog.open(
      AddNewIngredientPopUpComponent,
      {
        data: {
          message: 'hello',
          currentIngredients: this.ingredientsList
        },
        disableClose: true
      }
    );
    addIngredientDialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
  addResponse() {
    console.log(this.ingredientsList.slice(0,this.selectedValue))
    console.log(this.ingredientsList.slice(0,this.selectedValue))
    const addResponseDialogRef = this.dialog.open(
      AddNewAnswerPopUpComponent,
      {
        data: {
          message: 'hello',
          currentIngredients: this.ingredientsList.slice(0, this.selectedValue),
          fullList: this.ingredientsList
        },
        disableClose: true
      }
    );
    addResponseDialogRef.afterClosed().subscribe((response) => {
      console.log(response);
    });
  }
  haHafU(){
    if (this.joke) {
      this.joke = false;
    } else {
      this.joke = true;
    }
  }
  toAnswers(){
    this.router.navigate(['answer-view']);
  }
}
