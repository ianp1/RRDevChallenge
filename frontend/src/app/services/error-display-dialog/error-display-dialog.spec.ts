import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDisplayDialog } from './error-display-dialog';

describe('ErrorDisplayDialog', () => {
  let component: ErrorDisplayDialog;
  let fixture: ComponentFixture<ErrorDisplayDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDisplayDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDisplayDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
