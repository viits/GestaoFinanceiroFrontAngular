import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMensalDiaComponent } from './grafico-mensal-dia.component';

describe('GraficoMensalDiaComponent', () => {
  let component: GraficoMensalDiaComponent;
  let fixture: ComponentFixture<GraficoMensalDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficoMensalDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoMensalDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
