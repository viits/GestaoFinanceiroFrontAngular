import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoAtualComponent } from './pagamento-atual.component';

describe('PagamentoAtualComponent', () => {
  let component: PagamentoAtualComponent;
  let fixture: ComponentFixture<PagamentoAtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagamentoAtualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentoAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
