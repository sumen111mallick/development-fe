import { TestBed } from '@angular/core/testing';

import { UserLoggsGuard } from './user-loggs.guard';

describe('UserLoggsGuard', () => {
  let guard: UserLoggsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserLoggsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
