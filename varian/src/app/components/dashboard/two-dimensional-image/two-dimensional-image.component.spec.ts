import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDimensionalImageComponent } from './two-dimensional-image.component';

describe('TwoDimensionalImageComponent', () => {
  let component: TwoDimensionalImageComponent;
  let fixture: ComponentFixture<TwoDimensionalImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDimensionalImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDimensionalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
