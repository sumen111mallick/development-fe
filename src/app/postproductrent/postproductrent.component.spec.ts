import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostproductrentComponent } from './postproductrent.component';

describe('PostproductrentComponent', () => {
  let component: PostproductrentComponent;
  let fixture: ComponentFixture<PostproductrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostproductrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostproductrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
