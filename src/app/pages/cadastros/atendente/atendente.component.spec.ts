import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendenteComponent } from './atendente.component';

describe('AtendenteComponent', () => {
  let component: AtendenteComponent;
  let fixture: ComponentFixture<AtendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtendenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
