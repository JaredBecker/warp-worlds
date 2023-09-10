import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Country } from '@shared/models/country.interface';
import { CountryMin } from '@shared/models/country-min.interface';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    private api: string = 'https://restcountries.com/v3.1/all?fields=name,flag,coatOfArms';

    constructor(private http: HttpClient) { }

    /**
     * Gets the list of all countries with only selected fields
     *
     * @returns Observable of country list
     */
    public getAllCountries(): Observable<CountryMin[]> {
        const url = `${this.api}/all?fields=name,flag,coatOfArms`;

        return this.http.get<CountryMin[]>(url);
    }
}
