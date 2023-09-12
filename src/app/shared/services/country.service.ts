import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { Country } from '@shared/models/country.interface';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    private api: string = 'https://restcountries.com/v3.1';

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Gets the list of all countries with only selected fields
     *
     * @returns Stream of country list
     */
    public getAllCountries(): Observable<Country[]> {
        const url = `${this.api}/all?fields=name,region,fifa,population,languages,timezones,capital,currencies,maps,flag,coatOfArms`;

        return this.http.get<Country[]>(url);
    }

    /**
     * Gets a single countries info with the provided country name
     *
     * @param common_name Name of the country to get info for
     *
     * @returns Stream of single country
     */
    public getSingleCounty(common_name: string): Observable<Country> {
        const url = `${this.api}/name/${common_name}`;

        return this.http.get<Country[]>(url).pipe(
            map(country => country[0])
        );
    }
}
