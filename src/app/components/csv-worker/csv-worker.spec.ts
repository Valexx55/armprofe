import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvWorker } from './csv-worker';

describe('CsvWorker', () => {
  let component: CsvWorker;
  let fixture: ComponentFixture<CsvWorker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvWorker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvWorker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
