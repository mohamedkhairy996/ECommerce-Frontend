import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSliderComponent } from './cust-slider.component';

describe('CustSliderComponent', () => {
  let component: CustSliderComponent;
  let fixture: ComponentFixture<CustSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
