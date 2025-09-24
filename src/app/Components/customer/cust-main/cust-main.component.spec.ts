import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustMainComponent } from './cust-main.component';

describe('CustMainComponent', () => {
  let component: CustMainComponent;
  let fixture: ComponentFixture<CustMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
