import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReplaceDialogComponent } from './show-replace-dialog.component';

describe('ShowReplaceDialogComponent', () => {
  let component: ShowReplaceDialogComponent;
  let fixture: ComponentFixture<ShowReplaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReplaceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReplaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
