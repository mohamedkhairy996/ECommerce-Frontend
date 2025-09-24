import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCategoriesComponent } from './cust-categories.component';

describe('CustCategoriesComponent', () => {
  let component: CustCategoriesComponent;
  let fixture: ComponentFixture<CustCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
