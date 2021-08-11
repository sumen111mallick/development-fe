import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbardarkComponent } from './topbardark.component';

describe('TopbardarkComponent', () => {
  let component: TopbardarkComponent;
  let fixture: ComponentFixture<TopbardarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbardarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbardarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
