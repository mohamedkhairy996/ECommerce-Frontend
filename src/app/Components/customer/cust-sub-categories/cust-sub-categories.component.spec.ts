import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSubCategoriesComponent } from './cust-sub-categories.component';

describe('CustSubCategoriesComponent', () => {
  let component: CustSubCategoriesComponent;
  let fixture: ComponentFixture<CustSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustSubCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
