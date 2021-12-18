import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReplaceDialogComponent } from './new-replace-dialog.component';

describe('NewReplaceDialogComponent', () => {
  let component: NewReplaceDialogComponent;
  let fixture: ComponentFixture<NewReplaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReplaceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReplaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
