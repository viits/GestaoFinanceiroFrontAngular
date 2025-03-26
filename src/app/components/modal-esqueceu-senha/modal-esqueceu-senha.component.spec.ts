import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEsqueceuSenhaComponent } from './modal-esqueceu-senha.component';

describe('ModalEsqueceuSenhaComponent', () => {
  let component: ModalEsqueceuSenhaComponent;
  let fixture: ComponentFixture<ModalEsqueceuSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEsqueceuSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEsqueceuSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
