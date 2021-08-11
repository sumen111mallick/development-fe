import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogSinglePostComponent } from './admin-blog-single-post.component';

describe('AdminBlogSinglePostComponent', () => {
  let component: AdminBlogSinglePostComponent;
  let fixture: ComponentFixture<AdminBlogSinglePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBlogSinglePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlogSinglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
