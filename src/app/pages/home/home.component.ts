import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { CountryService } from '@shared/services/country.service';
import { Country } from '@shared/models/country.interface';
import { FilterOptions } from '@shared/models/filter-options.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
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
