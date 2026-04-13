import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fortaleza } from './fortaleza';

describe('Fortaleza', () => {
  let component: Fortaleza;
  let fixture: ComponentFixture<Fortaleza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fortaleza]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fortaleza);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
