import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoMenosDetalle } from './alumno-menos-detalle';

describe('AlumnoMenosDetalle', () => {
  let component: AlumnoMenosDetalle;
  let fixture: ComponentFixture<AlumnoMenosDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoMenosDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoMenosDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
