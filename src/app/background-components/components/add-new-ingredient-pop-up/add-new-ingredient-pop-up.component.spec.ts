import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIngredientPopUpComponent } from './add-new-ingredient-pop-up.component';

describe('AddNewIngredientPopUpComponent', () => {
  let component: AddNewIngredientPopUpComponent;
  let fixture: ComponentFixture<AddNewIngredientPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewIngredientPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIngredientPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
