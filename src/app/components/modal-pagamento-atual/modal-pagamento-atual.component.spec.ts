import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagamentoAtualComponent } from './modal-pagamento-atual.component';

describe('ModalPagamentoAtualComponent', () => {
  let component: ModalPagamentoAtualComponent;
  let fixture: ComponentFixture<ModalPagamentoAtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPagamentoAtualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPagamentoAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
