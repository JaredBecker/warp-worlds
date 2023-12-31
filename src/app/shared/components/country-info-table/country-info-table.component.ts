import { Component, Input } from '@angular/core';

import { Country } from '@shared/models/country.interface';

@Component({
    selector: 'app-country-info-table',
    templateUrl: './country-info-table.component.html',
})
export class CountryInfoTableComponent {
    @Input() public country!: Country;
}
