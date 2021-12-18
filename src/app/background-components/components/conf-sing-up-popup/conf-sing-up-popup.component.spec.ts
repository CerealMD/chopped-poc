import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfSingUpPopupComponent } from './conf-sing-up-popup.component';

describe('ConfSingUpPopupComponent', () => {
  let component: ConfSingUpPopupComponent;
  let fixture: ComponentFixture<ConfSingUpPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfSingUpPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfSingUpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
