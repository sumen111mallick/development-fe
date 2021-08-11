import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingetusersComponent } from './admingetusers.component';

describe('AdmingetusersComponent', () => {
  let component: AdmingetusersComponent;
  let fixture: ComponentFixture<AdmingetusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmingetusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingetusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
