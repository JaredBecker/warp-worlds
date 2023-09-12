import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, switchMap, throwError } from 'rxjs';

import { Country } from '@shared/models/country.interface';

import { CountryService } from '@shared/services/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
    public is_loading: boolean = true;
    public country?: Country;

    private _country_subscription?: Subscription;

    constructor(
        private countryService: CountryService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        this._country_subscription = this.activatedRoute.paramMap
            .pipe(
                switchMap((params) => {
                    const country_name = params.get('country-name');

                    if (country_name) {
                        // Get request throws actual error if the name is incorrect
                        return this.countryService.getSingleCounty(country_name);
                    }

                    // Making sure observable is returned if no name is set
                    return throwError(() => new Error())
                })
            )
            .subscribe({
                next: (country) => {
                    this.country = country;
                },
                error: () => {
                    this.router.navigateByUrl('/not-found', {
                        skipLocationChange: true,
                    })
                }
            });
    }

    public ngOnDestroy(): void {
        this._country_subscription?.unsubscribe();
    }
}
