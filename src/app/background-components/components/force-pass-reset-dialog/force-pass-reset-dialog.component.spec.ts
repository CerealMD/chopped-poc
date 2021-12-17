import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcePassResetDialogComponent } from './force-pass-reset-dialog.component';

describe('ForcePassResetDialogComponent', () => {
  let component: ForcePassResetDialogComponent;
  let fixture: ComponentFixture<ForcePassResetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcePassResetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcePassResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
