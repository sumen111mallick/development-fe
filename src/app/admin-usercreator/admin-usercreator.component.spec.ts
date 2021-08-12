import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsercreatorComponent } from './admin-usercreator.component';

describe('AdminUsercreatorComponent', () => {
  let component: AdminUsercreatorComponent;
  let fixture: ComponentFixture<AdminUsercreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsercreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsercreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
