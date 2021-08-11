import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFeaturedListComponent } from './blog-featured-list.component';

describe('BlogFeaturedListComponent', () => {
  let component: BlogFeaturedListComponent;
  let fixture: ComponentFixture<BlogFeaturedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogFeaturedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFeaturedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
