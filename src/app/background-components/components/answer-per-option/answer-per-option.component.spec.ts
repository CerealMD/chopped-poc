import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerPerOptionComponent } from './answer-per-option.component';

describe('AnswerPerOptionComponent', () => {
  let component: AnswerPerOptionComponent;
  let fixture: ComponentFixture<AnswerPerOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerPerOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerPerOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
