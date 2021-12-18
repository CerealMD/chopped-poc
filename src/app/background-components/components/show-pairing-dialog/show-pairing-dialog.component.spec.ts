import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPairingDialogComponent } from './show-pairing-dialog.component';

describe('ShowPairingDialogComponent', () => {
  let component: ShowPairingDialogComponent;
  let fixture: ComponentFixture<ShowPairingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPairingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPairingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
