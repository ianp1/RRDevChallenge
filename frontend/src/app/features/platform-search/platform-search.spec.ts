import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSearch } from './platform-search';

describe('PlatformSearch', () => {
  let component: PlatformSearch;
  let fixture: ComponentFixture<PlatformSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
