import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBanner2Component } from './cust-banner2.component';

describe('CustBanner2Component', () => {
  let component: CustBanner2Component;
  let fixture: ComponentFixture<CustBanner2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustBanner2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustBanner2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
