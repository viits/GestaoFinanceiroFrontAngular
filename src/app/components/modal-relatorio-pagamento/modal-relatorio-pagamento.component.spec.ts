import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRelatorioPagamentoComponent } from './modal-relatorio-pagamento.component';

describe('ModalRelatorioPagamentoComponent', () => {
  let component: ModalRelatorioPagamentoComponent;
  let fixture: ComponentFixture<ModalRelatorioPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRelatorioPagamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRelatorioPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
