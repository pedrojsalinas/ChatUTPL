import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChatsComponent } from './dashboard-chats.component';

describe('DashboardChatsComponent', () => {
  let component: DashboardChatsComponent;
  let fixture: ComponentFixture<DashboardChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
