import { TestBed } from '@angular/core/testing';

import { ProductSignalRService } from './product-signal-r.service';

describe('ProductSignalRService', () => {
  let service: ProductSignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
