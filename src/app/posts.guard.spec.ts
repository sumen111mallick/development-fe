import { TestBed } from '@angular/core/testing';

import { PostsGuard } from './posts.guard';

describe('PostsGuard', () => {
  let guard: PostsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PostsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
