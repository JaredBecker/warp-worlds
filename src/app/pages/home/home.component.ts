import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { CountryService } from '@shared/services/country.service';
import { Country } from '@shared/models/country.interface';
import { CountryMin } from '@shared/models/country-min.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    public countries: CountryMin[] = [];

    private _country_subscription?: Subscription;

    constructor(
        private countryService: CountryService,
        private toastrService: ToastrService
    ) { }

    public ngOnInit(): void {
        this._country_subscription = this.countryService
            .getAllCountries()
            .subscribe({
                next: (countries) => {
                    this.countries = countries;
                },
                error: () => this.toastrService.error('Please try refreshing the page', 'Failed to load countries'),
            })
    }

    public ngOnDestroy(): void {
        this._country_subscription?.unsubscribe();
    }
}
