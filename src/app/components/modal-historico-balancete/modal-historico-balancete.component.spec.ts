import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoBalanceteComponent } from './modal-historico-balancete.component';

describe('ModalHistoricoBalanceteComponent', () => {
  let component: ModalHistoricoBalanceteComponent;
  let fixture: ComponentFixture<ModalHistoricoBalanceteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalHistoricoBalanceteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoricoBalanceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
