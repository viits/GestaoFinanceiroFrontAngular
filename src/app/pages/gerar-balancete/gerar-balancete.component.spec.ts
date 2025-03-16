import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarBalanceteComponent } from './gerar-balancete.component';

describe('GerarBalanceteComponent', () => {
  let component: GerarBalanceteComponent;
  let fixture: ComponentFixture<GerarBalanceteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerarBalanceteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarBalanceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
