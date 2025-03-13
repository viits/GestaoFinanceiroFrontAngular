import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGerenteComponent } from './modal-gerente.component';

describe('ModalGerenteComponent', () => {
  let component: ModalGerenteComponent;
  let fixture: ComponentFixture<ModalGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalGerenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
