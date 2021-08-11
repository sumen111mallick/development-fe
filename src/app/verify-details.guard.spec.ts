import { TestBed } from '@angular/core/testing';

import { VerifyDetailsGuard } from './verify-details.guard';

describe('VerifyDetailsGuard', () => {
  let guard: VerifyDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifyDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
