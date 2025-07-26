import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMensalComponent } from './grafico-mensal.component';

describe('GraficoMensalComponent', () => {
  let component: GraficoMensalComponent;
  let fixture: ComponentFixture<GraficoMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficoMensalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
