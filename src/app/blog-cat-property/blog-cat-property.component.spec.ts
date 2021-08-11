import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCatPropertyComponent } from './blog-cat-property.component';

describe('BlogCatPropertyComponent', () => {
  let component: BlogCatPropertyComponent;
  let fixture: ComponentFixture<BlogCatPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCatPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCatPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
