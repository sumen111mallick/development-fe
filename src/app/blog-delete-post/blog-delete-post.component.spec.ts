import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDeletePostComponent } from './blog-delete-post.component';

describe('BlogDeletePostComponent', () => {
  let component: BlogDeletePostComponent;
  let fixture: ComponentFixture<BlogDeletePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDeletePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDeletePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
