import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcSignalComponent } from './imc-signal-component';

describe('ImcSignalComponent', () => {
  let component: ImcSignalComponent;
  let fixture: ComponentFixture<ImcSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImcSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImcSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
