import { TestBed } from '@angular/core/testing';

import { MobileVerifyGuard } from './mobile-verify.guard';

describe('MobileVerifyGuard', () => {
  let guard: MobileVerifyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MobileVerifyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
