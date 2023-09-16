import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CountryService } from '@shared/services/country.service';
import { Country } from '@shared/models/country.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public $countries_stream!: Observable<Country[]>;

    constructor(
        private countryService: CountryService,
    ) { }

    public ngOnInit(): void {
        this.$countries_stream = this.countryService.getAllCountries();
    }
}
