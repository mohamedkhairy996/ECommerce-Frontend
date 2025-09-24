import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBanner3Component } from './cust-banner3.component';

describe('CustBanner3Component', () => {
  let component: CustBanner3Component;
  let fixture: ComponentFixture<CustBanner3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustBanner3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustBanner3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
