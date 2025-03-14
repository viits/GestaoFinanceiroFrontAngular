import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPagamentoComponent } from './relatorio-pagamento.component';

describe('RelatorioPagamentoComponent', () => {
  let component: RelatorioPagamentoComponent;
  let fixture: ComponentFixture<RelatorioPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatorioPagamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
