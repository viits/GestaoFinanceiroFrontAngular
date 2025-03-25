import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoAtendenteComponent } from './modal-historico-atendente.component';

describe('ModalHistoricoAtendenteComponent', () => {
  let component: ModalHistoricoAtendenteComponent;
  let fixture: ComponentFixture<ModalHistoricoAtendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalHistoricoAtendenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoricoAtendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
