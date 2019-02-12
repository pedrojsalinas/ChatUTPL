import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarGlosarioComponent } from './modal-agregar-glosario.component';

describe('ModalAgregarGlosarioComponent', () => {
  let component: ModalAgregarGlosarioComponent;
  let fixture: ComponentFixture<ModalAgregarGlosarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarGlosarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarGlosarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
