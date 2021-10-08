import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchFormComponent } from './home-search-form.component';

describe('HomeSearchFormComponent', () => {
  let component: HomeSearchFormComponent;
  let fixture: ComponentFixture<HomeSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
