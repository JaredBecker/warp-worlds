import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCardPlaceholderComponent } from './country-card-placeholder.component';

describe('CountryCardPlaceholderComponent', () => {
  let component: CountryCardPlaceholderComponent;
  let fixture: ComponentFixture<CountryCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCardPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
