import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTipsComponent } from './articles-tips.component';

describe('ArticlesTipsComponent', () => {
  let component: ArticlesTipsComponent;
  let fixture: ComponentFixture<ArticlesTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
