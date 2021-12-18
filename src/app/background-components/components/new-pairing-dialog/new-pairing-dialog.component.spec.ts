import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPairingDialogComponent } from './new-pairing-dialog.component';

describe('NewPairingDialogComponent', () => {
  let component: NewPairingDialogComponent;
  let fixture: ComponentFixture<NewPairingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPairingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPairingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
