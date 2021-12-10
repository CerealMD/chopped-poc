import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorParringComponent } from './flavor-parring.component';

describe('FlavorParringComponent', () => {
  let component: FlavorParringComponent;
  let fixture: ComponentFixture<FlavorParringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlavorParringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorParringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
