import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreatePostComponent } from './blog-create-post.component';

describe('BlogCreatePostComponent', () => {
  let component: BlogCreatePostComponent;
  let fixture: ComponentFixture<BlogCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCreatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
