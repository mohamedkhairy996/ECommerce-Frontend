import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustTopcategoriesComponent } from './cust-topcategories.component';

describe('CustTopcategoriesComponent', () => {
  let component: CustTopcategoriesComponent;
  let fixture: ComponentFixture<CustTopcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustTopcategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustTopcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
