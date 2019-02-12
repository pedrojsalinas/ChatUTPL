import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashboardChatsDocenteComponent } from './menu-dashboard-chats-docente.component';

describe('MenuDashboardChatsDocenteComponent', () => {
  let component: MenuDashboardChatsDocenteComponent;
  let fixture: ComponentFixture<MenuDashboardChatsDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDashboardChatsDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDashboardChatsDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
