import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustToDayDealsProductsComponent } from './cust-to-day-deals-products.component';

describe('CustToDayDealsProductsComponent', () => {
  let component: CustToDayDealsProductsComponent;
  let fixture: ComponentFixture<CustToDayDealsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustToDayDealsProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustToDayDealsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
