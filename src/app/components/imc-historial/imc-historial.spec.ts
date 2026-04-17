import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcHistorial } from './imc-historial';

describe('ImcHistorial', () => {
  let component: ImcHistorial;
  let fixture: ComponentFixture<ImcHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImcHistorial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImcHistorial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
