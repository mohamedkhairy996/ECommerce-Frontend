import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustProductsComponent } from './cust-products.component';

describe('CustProductsComponent', () => {
  let component: CustProductsComponent;
  let fixture: ComponentFixture<CustProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
