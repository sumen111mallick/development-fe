import { TestBed } from '@angular/core/testing';

import { VerifyGuardGuard } from './verify-guard.guard';

describe('VerifyGuardGuard', () => {
  let guard: VerifyGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifyGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
