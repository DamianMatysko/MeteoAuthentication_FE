import { TestBed } from '@angular/core/testing';

import { MeasuredValuesService } from './measured-values.service';

describe('MeasuredValuesService', () => {
  let service: MeasuredValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasuredValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
