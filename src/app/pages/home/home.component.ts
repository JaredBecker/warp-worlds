import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { CountryService } from '@shared/services/country.service';
import { Country } from '@shared/models/country.interface';
import { FilterOptions } from '@shared/models/filter-options.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    public countries: Country[] = [];
    public regions: Set<string> = new Set();
    public filtered_countries: Country[] = [];
    public placeholders: any[] = new Array(24);
    public loading: boolean = true;

    private _country_subscription?: Subscription;

    constructor(
        private countryService: CountryService,
        private toastrService: ToastrService,
    ) { }

    public ngOnInit(): void {
        // Create preloader for no results image so it doesn't have to try and load in only when the user hit no results
        new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = error => reject(error);
            img.src = '/assets/images/no_results.svg';
        })

        this._country_subscription = this.countryService
            .getAllCountries()
            .subscribe({
                next: (countries) => {
                    // Store original list of countries
                    this.countries = countries;

                    // Create filter list so data can be manipulated
                    this.filtered_countries = this.countries;

                    //Create unique set of region names
                    this.regions = new Set(this.countries.map(country => country.region));
                    this.loading = false;
                },
                error: () => {
                    this.toastrService.error('Please try refreshing the page', 'Failed to load countries');
                    this.loading = false;
                },
            })
    }

    public ngOnDestroy(): void {
        this._country_subscription?.unsubscribe();
    }

    /**
     * Takes the filter object emitted and and filters the countries by the provided parameters
     *
     * @param filter_options Object containing search phrase and selected regions
     *
     * @returns void
     */
    public onFilter(filter_options: FilterOptions): void {
        // If we get an empty options obj reset results
        if (filter_options.search_value === '' && filter_options.selected_regions.length === 0) {
            this.filtered_countries = this.countries;

            return;
        }

        // Check if filter by region is set
        if (filter_options.selected_regions.length > 0) {
            // Filter all countries by those regions
            let filtered_countries = this.countries.filter(country => filter_options.selected_regions.includes(country.region));

            // Check if a search value is set and filter the filtered regions by the search phrase
            if (filter_options.search_value !== '') {
                filtered_countries = this.filterBySearchValue(filtered_countries, filter_options.search_value);
            }

            this.filtered_countries = filtered_countries;

            return;
        }

        // If only search value is set then filter by the value
        if (filter_options.search_value !== '') {
            this.filtered_countries = this.filterBySearchValue(this.countries, filter_options.search_value);

            return;
        }

        // Nothing is set so we just reset the results
        this.filtered_countries = this.countries;
    }

    /**
     * Filters the provided countries array by the provided search value
     *
     * @param countries Array of countries to filter
     * @param search_value The value to search for in the array
     *
     * @returns Filtered array of countries
     */
    private filterBySearchValue(countries: Country[], search_value: string): Country[] {
        const filtered_countries = countries.filter(country => {
            const common_name = country.name.common.toLowerCase().includes(search_value.toLowerCase());
            const fifa_name = country.fifa.toLowerCase().includes(search_value.toLowerCase());

            return common_name || fifa_name;
        });

        return filtered_countries;
    }
}
