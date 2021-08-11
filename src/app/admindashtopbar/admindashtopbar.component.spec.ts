import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashtopbarComponent } from './admindashtopbar.component';

describe('AdmindashtopbarComponent', () => {
  let component: AdmindashtopbarComponent;
  let fixture: ComponentFixture<AdmindashtopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindashtopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashtopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
