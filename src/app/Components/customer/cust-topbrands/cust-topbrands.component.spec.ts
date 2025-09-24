import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustTopbrandsComponent } from './cust-topbrands.component';

describe('CustTopbrandsComponent', () => {
  let component: CustTopbrandsComponent;
  let fixture: ComponentFixture<CustTopbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustTopbrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustTopbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
