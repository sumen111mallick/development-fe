import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingetreviewsComponent } from './admingetreviews.component';

describe('AdmingetreviewsComponent', () => {
  let component: AdmingetreviewsComponent;
  let fixture: ComponentFixture<AdmingetreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmingetreviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingetreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
