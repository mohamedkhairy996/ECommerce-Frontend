import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBestSellerProductsComponent } from './cust-best-seller-products.component';

describe('CustBestSellerProductsComponent', () => {
  let component: CustBestSellerProductsComponent;
  let fixture: ComponentFixture<CustBestSellerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustBestSellerProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustBestSellerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
