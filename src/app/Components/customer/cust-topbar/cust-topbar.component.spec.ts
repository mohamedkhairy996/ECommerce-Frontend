import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustTopbarComponent } from './cust-topbar.component';

describe('CustTopbarComponent', () => {
  let component: CustTopbarComponent;
  let fixture: ComponentFixture<CustTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustTopbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
