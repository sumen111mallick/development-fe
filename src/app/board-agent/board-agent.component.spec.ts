import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAgentComponent } from './board-agent.component';

describe('BoardAgentComponent', () => {
  let component: BoardAgentComponent;
  let fixture: ComponentFixture<BoardAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
