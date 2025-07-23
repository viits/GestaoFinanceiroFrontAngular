import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAtualComponent } from './grafico-atual.component';

describe('GraficoAtualComponent', () => {
  let component: GraficoAtualComponent;
  let fixture: ComponentFixture<GraficoAtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficoAtualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
