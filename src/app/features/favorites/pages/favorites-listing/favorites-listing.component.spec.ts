import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesListingComponent } from './favorites-listing.component';

describe('FavoritesListingComponent', () => {
  let component: FavoritesListingComponent;
  let fixture: ComponentFixture<FavoritesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
