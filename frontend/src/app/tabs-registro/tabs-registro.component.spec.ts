import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsRegistroComponent } from './tabs-registro.component';

describe('TabsRegistroComponent', () => {
  let component: TabsRegistroComponent;
  let fixture: ComponentFixture<TabsRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
