import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustFeaturedProductsComponent } from './cust-featured-products.component';

describe('CustFeaturedProductsComponent', () => {
  let component: CustFeaturedProductsComponent;
  let fixture: ComponentFixture<CustFeaturedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustFeaturedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustFeaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
