import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBannerComponent } from './cust-banner.component';

describe('CustBannerComponent', () => {
  let component: CustBannerComponent;
  let fixture: ComponentFixture<CustBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
