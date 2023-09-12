import { FavoritesService } from './../../../../shared/services/favorites.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '@shared/models/country.interface';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    public $countries_stream!: Observable<Country[]>;

    constructor(
        private favoritesService: FavoritesService
    ) { }

    public ngOnInit(): void {
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
