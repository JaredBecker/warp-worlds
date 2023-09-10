import { Component, Input } from '@angular/core';

import { Country } from '@shared/models/country.interface';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
    @Input() public country!: Country;
}
