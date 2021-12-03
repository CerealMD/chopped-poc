import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAnswerPopUpComponent } from './add-new-answer-pop-up.component';

describe('AddNewAnswerPopUpComponent', () => {
  let component: AddNewAnswerPopUpComponent;
  let fixture: ComponentFixture<AddNewAnswerPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAnswerPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAnswerPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
