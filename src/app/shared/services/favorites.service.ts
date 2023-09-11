import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Country } from '@shared/models/country.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private _currently_selected: {[key: string]: Country} = {};

    private _$favorite_countries: BehaviorSubject<{[key: string]: Country}> = new BehaviorSubject({});

    constructor(
        private toastrService: ToastrService
    ) {
        // Initializing stream value
        this._$favorite_countries.next(this.getFavoriteCountries());
    }

    /**
     * Gets the favorite countries stream
     *
     * @returns Stream of favorite countries
     */
    public getFavoriteCountriesStream(): Observable<{[key: string]: Country}> {
        return this._$favorite_countries.asObservable();
    }

    /**
     * Adds a country to your favorites list and updates country stream
     *
     * @param country Country to add to favorites
     */
    public addToFavorites(country: Country): void {
        const favorite_countries = this.getFavoriteCountries();

        if (favorite_countries[country.fifa]) {
            this.toastrService.warning(`You have ${country.name.common} in your favorites list`, 'Already In Favorites');
        } else {
            favorite_countries[country.fifa] = country;
            this.setFavoriteCountries(favorite_countries);
            this._$favorite_countries.next(favorite_countries);
            this.toastrService.success(`${country.name.common} has been added to your favorites list.`, 'Added To Favorites');
        }
    }

    /**
     * Removed the country with the provided FIFA code from local storage and updates country stream
     *
     * @param fifa_code FIFA code of item to remove
     */
    public removeFromFavorites(fifa_code: string): void {
        const favorite_countries = this.getFavoriteCountries();

        if (favorite_countries[fifa_code]) {
            const name = favorite_countries[fifa_code].name.common;
            delete favorite_countries[fifa_code];
            this.setFavoriteCountries(favorite_countries);
            this._$favorite_countries.next(favorite_countries);
            this.toastrService.success(`${name} has been removed from your favorites list.`, 'Removed From Favorites');
        } else {
            this.toastrService.error(`No country with code ${fifa_code} was found.`, 'Failed To Delete');
        }
    }

    /**
     * Gets favorite countries from local storage
     *
     * @returns Favorite countries
     */
    private getFavoriteCountries(): {[key: string]: Country} {
        const favorite_countries = localStorage.getItem('favorite_countries');

        return favorite_countries ? JSON.parse(favorite_countries) : {};
    }

    /**
     * Sets favorite countries property in local storage
     *
     * @param favorite_countries value to store
     */
    private setFavoriteCountries(favorite_countries: {[key: string]: Country}) {
        localStorage.setItem('favorite_countries', JSON.stringify(favorite_countries));
    }
}

