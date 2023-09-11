import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { Country } from '@shared/models/country.interface';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private _currently_selected: {[key: string]: Country} = {};

    private _$favorite_countries: BehaviorSubject<{[key: string]: Country}> = new BehaviorSubject({});
    private _$currently_selected_count: BehaviorSubject<number> = new BehaviorSubject(0);

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
     * Gets the currently selected count stream
     *
     * @returns Stream of the count of currently selected countries
     */
    public getCurrentlySelectedCountStream() {
        return this._$currently_selected_count.asObservable();
    }

    /**
     * Adds a country to your favorites list and updates country stream
     *
     * @param country Country to add to favorites
     */
    public addToFavorites(country: Country): void {
        const favorite_countries = this.getFavoriteCountries();
        const formatted_name = country.name.common.replaceAll(' ', '');

        if (favorite_countries[formatted_name]) {
            this.toastrService.warning(`You have ${country.name.common} in your favorites list`, 'Already In Favorites');
        } else {
            favorite_countries[formatted_name] = country;
            this.setFavoriteCountries(favorite_countries);
            this._$favorite_countries.next(favorite_countries);
            this.toastrService.success(`${country.name.common} has been added to your favorites list.`, 'Added To Favorites');
        }
    }

    /**
     * Remove the country with the provided FIFA code from local storage and updates country stream
     *
     * @param common_name Common name of country to remove
     */
    public removeFromFavorites(common_name: string): void {
        const favorite_countries = this.getFavoriteCountries();
        const formatted_name = common_name.replaceAll(' ', '');

        if (favorite_countries[formatted_name]) {
            const name = favorite_countries[formatted_name].name.common;
            delete favorite_countries[formatted_name];
            this.setFavoriteCountries(favorite_countries);
            this._$favorite_countries.next(favorite_countries);
            this.toastrService.success(`${name} has been removed from your favorites list.`, 'Removed From Favorites');
        } else {
            this.toastrService.error(`${common_name} was found in your favorite list.`, 'Failed To Delete');
        }
    }

    /**
     * Toggles a country in the currently selected obj
     *
     * @param country Country to add or remove from currently selected obj
     */
    public toggleCurrentlySelected(country: Country) {
        const formatted_name = country.name.common.replaceAll(' ', '');

        if (this._currently_selected[formatted_name]) {
            delete this._currently_selected[formatted_name];
        } else {
            this._currently_selected[formatted_name] = country;
        }

        // Update key count so it can be used to hide or show mass add to favorite button
        this._$currently_selected_count.next(Object.keys(this._currently_selected).length);
    }

    public addMultipleCountriesToFavorites() {
        if (Object.keys(this._currently_selected).length > 0) {
            const favorite_countries = this.getFavoriteCountries();

            for (const key in this._currently_selected) {
                favorite_countries[key] = this._currently_selected[key];
            }

            this.setFavoriteCountries(favorite_countries);
            this._$favorite_countries.next(favorite_countries);
            this._currently_selected = {};
            this._$currently_selected_count.next(0);
            this.toastrService.success('All selected countries have been added to your favorites list', 'Updated Favorites');
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

