import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbardarkLoaderComponent } from './topbardark-loader.component';

describe('TopbardarkLoaderComponent', () => {
  let component: TopbardarkLoaderComponent;
  let fixture: ComponentFixture<TopbardarkLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbardarkLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbardarkLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
