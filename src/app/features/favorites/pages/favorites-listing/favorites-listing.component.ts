import { Component, OnInit } from '@angular/core';

import { Observable, map } from 'rxjs';

import { Country } from '@shared/models/country.interface';
import { FavoritesService } from '@shared/services/favorites.service';

@Component({
    selector: 'app-favorites-listing',
    templateUrl: './favorites-listing.component.html',
    styleUrls: ['./favorites-listing.component.scss']
})
export class FavoritesListingComponent implements OnInit {
    public $countries_stream!: Observable<Country[]>;

    constructor(
        private favoritesService: FavoritesService
    ) { }

    public ngOnInit(): void {
        // Clear currently selected list to make sure add to favorites button doesn't show on favorites page
        this.favoritesService.clearCurrentlySelected();

        this.$countries_stream = this.favoritesService
            .getFavoriteCountriesStream()
            .pipe(
                map((favorites) => {
                    // Converting favorites obj to country array
                    const countries: Country[] = [];

                    for (const key in favorites) {
                        countries.push(favorites[key]);
                    }

                    return countries;
                })
            )
    }
}
