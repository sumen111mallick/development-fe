import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchleftbarComponent } from './searchleftbar.component';

describe('SearchleftbarComponent', () => {
  let component: SearchleftbarComponent;
  let fixture: ComponentFixture<SearchleftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchleftbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchleftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
