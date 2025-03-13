import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtendenteComponent } from './modal-atendente.component';

describe('ModalAtendenteComponent', () => {
  let component: ModalAtendenteComponent;
  let fixture: ComponentFixture<ModalAtendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAtendenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAtendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
