import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalUsersPanelComponent } from './internal-users-panel.component';

describe('InternalUsersPanelComponent', () => {
  let component: InternalUsersPanelComponent;
  let fixture: ComponentFixture<InternalUsersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalUsersPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalUsersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
