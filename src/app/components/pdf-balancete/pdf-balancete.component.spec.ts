import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfBalanceteComponent } from './pdf-balancete.component';

describe('PdfBalanceteComponent', () => {
  let component: PdfBalanceteComponent;
  let fixture: ComponentFixture<PdfBalanceteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfBalanceteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfBalanceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
