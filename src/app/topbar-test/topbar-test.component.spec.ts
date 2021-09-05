import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarTestComponent } from './topbar-test.component';

describe('TopbarTestComponent', () => {
  let component: TopbarTestComponent;
  let fixture: ComponentFixture<TopbarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
