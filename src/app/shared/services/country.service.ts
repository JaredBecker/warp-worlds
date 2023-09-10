import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Country } from '@shared/models/country.interface';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    private api: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    /**
     * Gets the list of all countries with only selected fields
     *
     * @returns Observable of country list
     */
    public getAllCountries(): Observable<Country[]> {
        const url = `${this.api}/all?fields=name,region,fifa,population,languages,timezones,capital,currencies,maps,flag,coatOfArms`;

        return this.http.get<Country[]>(url);
    }
}
