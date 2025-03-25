import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoFornecedorComponent } from './modal-historico-fornecedor.component';

describe('ModalHistoricoFornecedorComponent', () => {
  let component: ModalHistoricoFornecedorComponent;
  let fixture: ComponentFixture<ModalHistoricoFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalHistoricoFornecedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoricoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
