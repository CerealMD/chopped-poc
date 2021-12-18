import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementPageComponent } from './replacement-page.component';

describe('ReplacementPageComponent', () => {
  let component: ReplacementPageComponent;
  let fixture: ComponentFixture<ReplacementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplacementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
