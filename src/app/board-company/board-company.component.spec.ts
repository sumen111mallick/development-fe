import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCompanyComponent } from './board-company.component';

describe('BoardCompanyComponent', () => {
  let component: BoardCompanyComponent;
  let fixture: ComponentFixture<BoardCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
