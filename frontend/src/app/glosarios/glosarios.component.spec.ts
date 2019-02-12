import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlosariosComponent } from './glosarios.component';

describe('GlosariosComponent', () => {
  let component: GlosariosComponent;
  let fixture: ComponentFixture<GlosariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlosariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlosariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
